import React from 'react';
import {useSetState} from 'react-use';
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
    loginError: null
}

export const AuthContext = React.createContext(null);

export const ContextProvider = props => {
    const [state, setState] = useSetState(initialState);

    const setLoginPending = (isPending) => setState({isPending});
    const setLoginSuccess = (loggedin) => setState({loggedin});
    const setLoginError = (loginError) => setState({loginError});

    const register = (username, emailAddress, fName, lName, password) => {
        var hash = bcrypt.hashSync(password, salt);
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        fetchRegister(username, hash, error => {
            setLoginPending(false);

            if (!error) {
                state.username = username;
                state.emailAddress = emailAddress;
                state.fName = fName;
                state.lName = lName;
                state.password = hash;
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

        fetchLogin(username, hash, error => {
            setLoginPending(false);

            if (!error) {
                //ToDo: grab this data from database instead of like this, and include email, fname, lname
                state.username = username;
                state.password = hash;
                // grad rest of data here
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
const fetchLogin = (username, password, callback) =>
    setTimeout(() => {
        // ToDo: currently hardcoded, have it actually check database using another function
        // also have username check be interchangeable with checking email
        if ((username === 'username' || username === 'user@email.com') && password === bcrypt.hashSync('password', salt)) {
            return callback(null);
        } else {
            return callback(new Error('Invalid username or password'));
        }
    }, 1000);

// fake Register User
const fetchRegister = (username, password, callback) =>
    setTimeout(() => {
        // ToDo: currently hardcoded, have it actually check database using user model
        if (username === 'username' && password === bcrypt.hashSync('password', salt)) {
            return callback(null);
        } else {
            return callback(new Error('Error, account already Exists'));
        }
    }, 1000);