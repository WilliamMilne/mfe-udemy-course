import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import { Switch, Route } from 'react-router-dom'

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

    return <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header onSignOut={() => setIsSignedIn(false)} isSignedIn={isSignedIn}/>
        <Suspense fallback={<Progress></Progress>}>
        <Switch>
          <Route path="/auth">
            <AuthLazy onSignIn={() => setIsSignedIn(true)}></AuthLazy>
          </Route>
          <Route path="/" component={MarketingLazy}>
            
          </Route>
        </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>

};
