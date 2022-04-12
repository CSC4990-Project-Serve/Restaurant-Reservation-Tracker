import React from 'react';
import {useSetState} from 'react-use';
import $ from "jquery";
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);

const initialState = {
    loggedin: false,
    isPending: false,
    username: "",
    password: "",
    emailAddress: "",
    fName: "",
    lName: "",
    isadmin: false,
    loginError: null,
    salt : salt,
    phone_number : ""
}

export const AuthContext = React.createContext(null);

export const ContextProvider = props => {
    const [state, setState] = useSetState(initialState);

    const setLoginPending = (isPending) => setState({isPending});
    const setLoginSuccess = (loggedin) => setState({loggedin});
    const setLoginError = (loginError) => setState({loginError});

    const register = (username, emailAddress, fName, lName, password, phone_number) => {
        var hash = bcrypt.hashSync(password, salt);
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        state.username = username;
        state.emailAddress = emailAddress;
        state.firstName = fName;
        state.lastName = lName;
        state.password = hash;
        state.phone_number = phone_number;
        alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
            "\nlname: " + state.lastName + "\nphoneNumber: " + state.phone_number + "\npassword: " + state.password);

        fetchRegister(state, username, hash, error => {
            setLoginPending(false);

            if (!error) {
                setLoginSuccess(true);
                console.log('account created')
            } else {
                setLoginError(error);
            }
        });
    }
    const login = (username, password) => {
        var hash = bcrypt.hashSync(password, salt);
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        fetchLogin(state, username, hash, (error) => {
            setLoginPending(false);

            if (!error) {
                //ToDo: grab this data from database instead of like this, and include email, fname, lname
                state.username = username;
                state.emailAddress = username;
                state.password = hash;
                // alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
                //     "\nlname: " + state.lastName + "\nphoneNumber: " + state.phone_number + "\npassword: " + state.password);
                setLoginSuccess(true);
                console.log('correct login')
            } else {
                setLoginError(error);
            }
        });
    }
    const logout = () => {
        setLoginPending(false);
        setLoginSuccess(false);
        setLoginError(null);
    }
    return (
        <AuthContext.Provider
            value={{
                state,
                login,
                logout,
                register,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
// fake login
const fetchLogin = (state, username, password, callback) =>
    setTimeout(() => {
        const userInfo = {
            username: username,
            email_address: state.username,
            first_name: "",
            last_name: "",
            phone_number: "",
            password : password,
            password_salt: state.salt
        }
        $.ajax({
            type:"POST",
            url:"http://localhost:5000/api/login",
            data : userInfo,
            success : function(){
                return callback(null);
            },
            error : function(){
                return callback(new Error('Invalid username or password'));
            },
            dataType:"json"
        });
        // ToDo: currently hardcoded, have it actually check database using another function
        // also have username check be interchangeable with checking email
        // if ((username === 'username' || username === 'user@email.com') && password === bcrypt.hashSync('password', salt)) {
        //     return callback(null);
        // } else {
        //     return callback(new Error('Invalid username or password'));
        // }
    }, 1000);

// fake Register User
const fetchRegister = (state, username, password, callback) =>
    setTimeout(() => {
        const userInfo = {
            username: state.username,
            email_address: state.emailAddress,
            first_name: state.fName,
            last_name: state.lName,
            phone_number: state.phone_number,
            hashed_password: state.password,
            password_salt: state.salt
        }
        // ToDo: currently hardcoded, have it actually check database using user model
        $.ajax({
            type:"POST",
            url:"http://localhost:5000/api/users",
            data : userInfo,
            success : function(){
                return callback(null);
            },
            error : function(){
                return callback(new Error('Error, invalid or account already Exists'));
            },
            dataType:"json"
        });
    }, 1000);