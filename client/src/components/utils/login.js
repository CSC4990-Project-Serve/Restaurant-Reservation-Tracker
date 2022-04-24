import {React,useContext} from 'react';
import {useSetState} from 'react-use';
import $ from "jquery";
import {UserContext} from "../../context/UserContext";
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

const fetchLogin = (username, password, callback) => {
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
}
export const login = async (username, password) => {
    fetchLogin(username, password, (response) => {
        let thisuser = {
            loggedin: false,
            isAdmin: false,
            loginError: null,
            userid: null,
            username: "",
        };
        console.log(response);
        if (response.data !== false) {
            thisuser.userid = response.data[0].id;
            thisuser.username = response.data[0].username;
            // state.password = "$2a$10$8V1T0ItVevmJUS.u3qv3t.ExfM9vXdZp4ErwVta9q3q0bShg/EoLm";
            //user.password = null;
            // alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
            //     "\nlname: " + state.lastName + "\nphoneNumber: " + state.phone_number + "\npassword: " + state.password);
            thisuser.loggedin = true;
            console.log('correct login')
            //console.log(state);
        } else if (response.data[0].id === null) {
            thisuser.loginError = response.data;
        } else {
            thisuser.loginError = response.data;
        }
    });
}
