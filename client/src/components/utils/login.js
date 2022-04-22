import React from 'react';
import {useSetState} from 'react-use';
import $ from "jquery";
const bcrypt = require('bcryptjs');
const axios = require("axios");

const initialState = {
    userid: null,
    loggedin: false,
    username: "",
    password: "",
    isadmin: false,
    loginError: null
}

const fetchLogin = (username, password, callback) =>
    setTimeout(() => {
        console.log("WE ARE IN THE fetchLogin with data");
        const userInfo = {
            username: username,
            email_address: username,
            //first_name: "",
            //last_name: "",
            //phone_number: "",
            password: password,
            //password_salt: state.salt
        }
        console.log(username, password, JSON.stringify(userInfo));
        console.log(JSON.stringify(userInfo))
        axios.post("http://localhost:5000/api/login", {...userInfo}, {
            headers: {
                "access-control-allow-origin": "*",
            }
        })
            .then(response => callback(response))
            .then(response => console.log(response.data[0]))
            .catch(err => console.warn(err));
        // ToDo: currently hardcoded, have it actually check database using another function
        // also have username check be interchangeable with checking email
        // if ((username === 'username' || username === 'user@email.com') && password === bcrypt.hashSync('password', salt)) {
        //     return callback(null);
        // } else {
        //     return callback(new Error('Invalid username or password'));
        // }
    }, 1000);
export const login = async (username, password) => {
    let user = {
        loggedin: false,
        isadmin: false,
        loginError: null,
        username: "",
        userid: null,
    };
    fetchLogin(username, password, (response) => {
        console.log(response);

        if (response.data !== false) {
            user.userid = response.data[0].id;
            user.username = response.data[0].username;
            // state.password = "$2a$10$8V1T0ItVevmJUS.u3qv3t.ExfM9vXdZp4ErwVta9q3q0bShg/EoLm";
            user.password = null;
            // alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
            //     "\nlname: " + state.lastName + "\nphoneNumber: " + state.phone_number + "\npassword: " + state.password);
            user.loggedin = true;
            console.log('correct login')
            //console.log(state);
        } else if (user.userid === null) {
            user.loginError = response.data;
        } else {
            user.loginError = response.data;
        }
        return user;
    });
    return user;
}