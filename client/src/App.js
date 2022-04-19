import React, {useEffect, useContext, useState, Fragment} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AuthContext} from "./context/Auth.Context";


import HomePage from './pages/HomePage'
import SearchPage from "./pages/SearchPage";
import RestaurantPage from "./pages/RestaurantPage";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";


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
        const res = await fetch('http://localhost:5000/api/users');
        const data = await res.json();

        return data;
    }

    return (
        <>
            <BrowserRouter>
                {/*TODO: Why do we use Fragment*/}
                <Fragment>
                    <Routes>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={<HomePage />} />
                        <Route path="/search" element={<SearchPage />} />
                        <Route path="/search/:id" element={<RestaurantPage />} />
                        <Route path="/admin" element={<AdminPage />} />
                        <Route path={"/UserHome"} element={<UserHome/>}/>
                    </Routes>
                </Fragment>
            </BrowserRouter>
        </>
    );
}

export default App;
