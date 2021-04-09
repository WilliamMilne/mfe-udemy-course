import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { createMemoryHistory, createBrowserHistory } from 'history';

// Mount function to start up the app
const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(
    <App onSignIn={onSignIn} history={history}/>,
    el
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    }
  };
};

// If we are in dev mode
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// If we are in prod mode
// should export mount function
export { mount };