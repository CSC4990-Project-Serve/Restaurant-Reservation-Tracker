import React, {useEffect, useContext, useState, Fragment, useMemo} from "react";
import {BrowserRouter as Router, Switch, Route, Routes, Redirect, Navigate} from "react-router-dom";
import {
    Login,
    Main,
    SomonaukCountryKitchen,
    Register, SearchPage,UserHome,
} from "./components";
import {UserContext} from "./Context/UserContext";
//import {AuthContext} from "./Context/Auth.Context";

function App() {

    //const { state } = useContext(AuthContext);
    const userProfile = {
        loggedin : false,
        isadmin : false,
        loginError : null,
        username: "",
        userid: null,
    }

    const [user, setUser] = useState(userProfile);

    const providerValue = useMemo(() => ({user, setUser}), [user, setUser]);

    // useEffect(() => {
    //     const getUsers = async () => {
    //         const usersFromServer = await getUsersFromAPI();
    //         setUser(usersFromServer)
    //     }
    //
    //     getUsers();
    // }, [])


    // Get all users from server
    // const getUsersFromAPI = async () => {
    //     const res = await fetch('http://localhost:5000/api/users');
    //     const data = await res.json();
    //
    //     return data;
    // }

    return (<UserContext.Provider value={providerValue}>
        <Router>
            <Fragment>
                <Routes>
                    <Route path="/LoginPage" element={<Login />} />
                    <Route path={"/RegisterPage"} element={<Register />} />
                    <Route path="/" element={<Main />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path={"/UserHome"} element={<UserHome/>}/>
                    <Route path={"/SomonaukCountryKitchen"} element={<SomonaukCountryKitchen />}/>
                </Routes>
            </Fragment>
        </Router>
    </UserContext.Provider>);
}

export default App;
