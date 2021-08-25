import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../helpers/getUser";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        user && restricted ? <Redirect to="/app/" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
