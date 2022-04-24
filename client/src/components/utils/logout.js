import React, {useContext} from 'react';
import {UserContext} from "../../context/UserContext";

const bcrypt = require('bcryptjs');
const axios = require("axios");

export const logout = () => {
    const {user, setUser} = useContext(UserContext)
    setUser({
        loggedin: false,
        isAdmin: false,
        loginError: null,
        userid: null,
        username: "",
    });
}