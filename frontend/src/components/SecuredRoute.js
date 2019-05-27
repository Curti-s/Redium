import React from "react";
import { Route } from "react-router-dom";
import auth0client from "../utils/Auth";

function SecuredRoute(props) {
  const { component: Component, path } = props;

  return (
    <Route
      path={path}
      render={() => {
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
