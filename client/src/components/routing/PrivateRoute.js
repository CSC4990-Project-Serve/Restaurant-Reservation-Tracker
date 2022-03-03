import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {auth as authenticated} from '../../pages/Login';

const PrivateRoute = () => {
    const auth = authenticated.loggedin; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <Outlet /> : <Navigate to="/Login" />;
}

export default PrivateRoute;