import React from 'react';

const bcrypt = require('bcryptjs');
const axios = require("axios");

export const logout = () => {
    return {
        loggedin: false,
        isadmin: false,
        loginError: null,
        username: "",
        userid: null,
    };
}