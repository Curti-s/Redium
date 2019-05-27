import React from "react";
import { Route } from "react-router-dom";
import auth0client from "../utils/Auth";

function SecuredRoute(props) {
  const { component: Component, path, checkingSession } = props;

  return (
    <Route
      path={path}
      render={() => {
        if (checkingSession)
          return <h3 className="text-center">Validating session...</h3>;
        if (!auth0client.isAuthenticated()) {
          auth0client.signIn();
          return <div />;
        }
        return <Component />;
      }}
    />
  );
}

export default SecuredRoute;
