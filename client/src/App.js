import React, {useEffect, useContext, createContext, useState, Fragment} from "react";
import {BrowserRouter as Router, Switch, Route, Routes, Redirect, Navigate} from "react-router-dom";
import {
    Login,
    Main,
    SomonaukCountryKitchen,
    Register, SearchPage,
} from "./components";
import {AuthContext} from "./Context/Auth.Context";

function App() {

    const [user, setUser] = useState()
    const { state } = useContext(AuthContext);

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await getUsersFromAPI();
            setUser(usersFromServer)
        }

        getUsers();
    }, [])


    // Get all users from server
    const getUsersFromAPI = async () => {
        const res = await fetch('http://localhost:5000/users');
        const data = await res.json();

        return data;
    }

    return (
        <Router>
            <Fragment>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path={"/Register"} element={<Register />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path={"/SomonaukCountryKitchen"} element={<SomonaukCountryKitchen />}/>
                </Routes>
            </Fragment>
        </Router>
    );
}

export default App;
