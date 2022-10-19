import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMemoryHistory, createBrowserHistory } from "history";
// Mount function to start up the app

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
  // * We only provide a defaultHistory IF we are in DEVELOPMENT,
  // or is isolation (on localhost:8081)

  // if the application is being rendered through the container
  // then we will call createMemoryHistory
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App onSignIn={onSignIn} history={history} />, el);

  return {
    //from location, we destructure out pathname, and rename it to nextPathname
    onParentNavigate({ pathname: nextPathname }) {
      // container navigates
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// if in development or isolation,
// call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_auth-dev-root");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// else we are running through container
// and should export mount function
export { mount };
