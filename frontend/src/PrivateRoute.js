import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('authToken');
  
  // This now directly returns the component or redirect.
  return token ? Component : <Navigate to="user/login" />;
};

export default PrivateRoute;
