import React from "react";
import { Redirect, Route } from "react-router-dom";
import { getUser } from "../utils/getUser";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = getUser();
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login/" />
      }
    />
  );
};

export default PrivateRoute;