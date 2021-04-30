import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const isLogin = () => {
  if (sessionStorage.getItem('co_aiduser')) return true;
  return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => (isLogin() ? <Component {...props} /> : <Redirect to="/signin" />)} />;
};

export default PrivateRoute;
