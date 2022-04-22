import {createContext} from "react";

export const UserContext = createContext({
    loggedin : false,
    isadmin : false,
    loginError : null,
    username: "",
    userid: null,
});