import React, {useContext} from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {AuthContext} from "../../Context/Auth.Context";

const PrivateRoute = () => {
    const { state } = useContext(AuthContext);
    const auth = state.loggedin; // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to register page if not logged in
    return auth ? <Outlet /> : <Navigate to="/Register" />;
}

export default PrivateRoute;