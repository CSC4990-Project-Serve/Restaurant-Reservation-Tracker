import React, {useEffect, useContext, createContext, useState, Fragment} from "react";
import {BrowserRouter as Router, Switch, Route, Routes, Redirect, Navigate} from "react-router-dom";
import {
    Login,
    Main,
    SomonaukCountryKitchen,
    Navbar,
    Footer,
} from "./components";
import PrivateRoute from './components/routing/PrivateRoute';

function App() {

    const [user, setUser] = useState()

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
            <Navbar/>
            <switch>
                <Routes>
                    <Route path="/Login" element={<Login />} />
                    <Route path="/" element={<Main />} />
                    <Route path={"/SomonaukCountryKitchen"} element={<PrivateRoute/>}>
                        <Route path={"/SomonaukCountryKitchen"} element={<SomonaukCountryKitchen />}/>
                    </Route>
                </Routes>
            </switch>
            <Footer/>
            </Fragment>
        </Router>
    );
}

export default App;
