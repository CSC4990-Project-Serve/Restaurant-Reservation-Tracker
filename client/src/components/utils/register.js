// import React, {useContext} from 'react';
// import {useSetState} from 'react-use';
// import $ from "jquery";
// import {UserContext} from "../../context/UserContext";
// const bcrypt = require('bcryptjs');
// const axios = require("axios");
//
// var salt = bcrypt.genSaltSync(10);
// const initialState = {
//     userid: null,
//     loggedin: false,
//     isPending: false,
//     username: "",
//     password: "",
//     emailAddress: "",
//     fName: "",
//     lName: "",
//     isadmin: false,
//     loginError: null,
//     salt: salt,
//     phone_number: ""
// }
//
// const fetchRegister = (username, emailAddress, fName, lName, phone_number, hash, callback) =>
//     setTimeout(() => {
//         const userInfo = {
//             username: username,
//             email_address: emailAddress,
//             first_name: fName,
//             last_name: lName,
//             phone_number: phone_number,
//             hashed_password: hash,
//             password_salt: initialState.salt
//         }
//         // ToDo: currently hardcoded, have it actually check database using user model
//         $.ajax({
//             type: "POST",
//             url: "http://localhost:5000/api/users",
//             data: userInfo,
//             success: function () {
//                 return callback(null);
//             },
//             error: function () {
//                 return callback(new Error('Error, invalid or account already Exists'));
//             },
//             dataType: "json"
//         });
//     }, 1000);
// export const register = async (username, emailAddress, fName, lName, password, phone_number) => {
//     var hash = bcrypt.hashSync(password, salt);
//     let thisuser = {
//         loggedin: false,
//         isadmin: false,
//         loginError: null,
//         username: "",
//         userid: 0,
//     };
//     fetchRegister(username, emailAddress, fName, lName, phone_number, hash, error => {
//
//         if (!error) {
//             //Todo: update context variables
//             thisuser.loggedin = true;
//             thisuser.username = username;
//             console.log('account created')
//         } else {
//             //Todo: set error variable of context
//             thisuser.loginError = error;
//         }
//     })
// }