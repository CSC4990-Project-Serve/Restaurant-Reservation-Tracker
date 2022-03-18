import React from 'react';
import {useSetState} from 'react-use';

const initialState = {
    loggedin: false,
    isPending: false,
    username: "",
    password: "",
    isadmin: false,
    loginError: null
}

export const AuthContext = React.createContext(null);

export const ContextProvider = props => {
    const [state, setState] = useSetState(initialState);

    const setLoginPending = (isPending) => setState({isPending});
    const setLoginSuccess = (loggedin) => setState({loggedin});
    const setLoginError = (loginError) => setState({loginError});

    const login = (username, password) => {
        setLoginPending(true);
        setLoginSuccess(false);
        setLoginError(null);

        fetchLogin(username, password, error => {
            setLoginPending(false);

            if (!error) {
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
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
}
// fake login
const fetchLogin = (username, password, callback) =>
    setTimeout(() => {
        if (username === 'username' && password === 'password') {
            return callback(null);
        } else {
            return callback(new Error('Invalid username or password'));
        }
    }, 1000);