import React, { lazy, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom'
import Header from './components/Header';
import Progress from './components/Progress';
import { StylesProvider, createGenerateClassName } from '@material-ui/styles';
import { Switch, Route } from 'react-router-dom'

const marketingLazy = lazy(() => import('./components/MarketingApp'));
const authLazy = lazy(() => import('./components/AuthApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'co'
})

export default () => {
    return <StylesProvider generateClassName={generateClassName}>
      <BrowserRouter>
        <Header/>
        <Suspense fallback={<Progress></Progress>}>
        <Switch>
          <Route path="/auth" component={authLazy}></Route>
          <Route path="/" component={marketingLazy}></Route>
        </Switch>
        </Suspense>
      </BrowserRouter>
    </StylesProvider>

};
