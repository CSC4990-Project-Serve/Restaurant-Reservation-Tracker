import {useEffect, useMemo, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from './pages/HomePage'
import SearchPage from "./pages/SearchPage";
import RestaurantPage from "./pages/RestaurantPage";
import AdminPage from "./pages/AdminPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserHome from "./pages/UserHome";
import './css/App.css';
import {UserContext} from "./context/UserContext";
import NavigationBar from "./components/NavigationBar";
import {CookiesProvider, useCookies} from 'react-cookie';
import * as jose from 'jose'

function App() {

    const userProfile = {
        loggedIn: false,
        isAdmin: false,
        loginError: null,
        user: {
            id: null,
            username: null,
            email_address: null,
            first_name: null,
            last_name: null,
            phone_number: null,
        },
    }

    const [cookies, setCookie, removeCookie] = useCookies();
    const [userProfileData, setUserProfileData] = useState(cookies.userProfileData ? cookies.userProfileData : userProfile);
    console.log(`cookie/state value: ${JSON.stringify(userProfileData)}`)


    useEffect(() => {
        if (userProfileData.loggedIn === false && userProfileData.user === null) {
            removeCookie("userProfileData");
            setUserProfileData(userProfile)
        } else {
            setCookie("userProfileData", userProfileData);
        }
    }, [userProfileData])

    const userContextProviderVal = useMemo(() => ({
        userProfileData,
        setUserProfileData
    }), [userProfileData, setUserProfileData])


    const [restaurant_data, setRestaurantData] = useState([]);
    const [user_data, setUserData] = useState([]);

    const getData = () => {
        let routes = [
            `http://localhost:5000/api/restaurant/`,
            `http://localhost:5000/api/users/`,
        ];
        Promise.all(routes.map((route) => axios.get(route))).then(([{data: restaurant_data}, {data: user_data}]) => {
            setRestaurantData(restaurant_data)
            setUserData(user_data)
        });
    }

    useEffect(() => {
        getData();
    }, []);

    //TODO: reset password, delete account, view user information, update name
    //TODO: route= /user route= /user/reservations

    return (
        <>
            <CookiesProvider>
                <UserContext.Provider value={userContextProviderVal}>
                    <BrowserRouter>
                        <ScrollToTop/>
                        <Routes>
                            <Route path={"/navbar"} element={<NavigationBar/>}/>
                            <Route path="/register" element={<RegisterPage/>}/>
                            <Route path="/login" element={<LoginPage/>}/>
                            <Route path="/" element={<HomePage restaurant_data={restaurant_data}/>}/>
                            <Route path="/search" element={<SearchPage restaurant_data={restaurant_data}/>}/>
                            <Route path="/search/:id" element={<RestaurantPage/>}/>
                            <Route path="/admin"
                                   element={<AdminPage restaurant_data={restaurant_data} user_data={user_data}/>}/>
                            <Route path={"/UserHome"} element={<UserHome/>}/>
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </CookiesProvider>
        </>
    );
}

export default App;
