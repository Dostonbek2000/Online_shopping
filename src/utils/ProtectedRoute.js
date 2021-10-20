import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
  <Route
    {...rest}
    render={(props) => (auth ? 
    <Component {...props} />
     : <Redirect to="/login" />)}
  />
)};

export default ProtectedRoute;