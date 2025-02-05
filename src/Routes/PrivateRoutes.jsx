import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoutes = ({children}) => {

    const {user,loading} = useAuth()
    const location = useLocation()

    if(loading) return <span className="loading loading-ring loading-lg"></span>
    if(user) return children

    return (
      <Navigate to='/login'></Navigate>
    );
};

export default PrivateRoutes;