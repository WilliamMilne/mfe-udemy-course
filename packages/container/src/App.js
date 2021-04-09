import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import { createBrowserHistory } from 'history';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push('/dashboard');
    }
  }, [isSignedIn])

    return <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Suspense fallback={<Progress></Progress>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true)}></AuthLazy>
          </Route>
          <Route path="/dashboard">
            {
              !isSignedIn && <Redirect to="/"></Redirect>
            }
            <DashboardLazy></DashboardLazy>
          </Route>
          <Route path="/" component={MarketingLazy}>
            
          </Route>
        </Switch>
        </Suspense>
      </Router>
    </StylesProvider>

};
