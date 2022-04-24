import {createContext} from "react";

const initialState = {
        loggedin: false,
        isAdmin: false,
        loginError: null,
        userid: null,
        username: "",
}

export const UserContext = createContext(initialState
);



