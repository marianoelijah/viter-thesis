import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return <Navigate to="/login" />;
    }
  
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/" />;
    }
  
    return <Outlet />;
  };

export default PrivateRoute
