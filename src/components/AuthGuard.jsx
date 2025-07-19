import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = ({isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login"  replace/>;
  }

  return children ? children : <Outlet/>;
};

export default AuthGuard;