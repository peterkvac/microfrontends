import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const generateClassName = createGenerateClassName({
  productionPrefix: "au",
});

import Signin from "./components/Signin";
import Signup from "./components/Signup";

// we want to distinguish between using browser history (top level)
// and memory history objects in our projects. See lecture 90 in the video
// important detail; the Router allows us to use the history object we
// want to define; this Router object does not create its own history
// as BrowserRouter does, so we must provide the history
// we will provide it in the bootstrap file

export default ({ history, onSignIn }) => {
  return (
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history}>
          <Switch>
            <Route path="/auth/signin">
              <Signin onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signup">
              <Signup onSignIn={onSignIn} />
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  );
};
