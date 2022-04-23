import {useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";
import ScrollToTop from "./components/ScrollToTop";
import HomePage from './pages/HomePage'
import SearchPage from "./pages/SearchPage";
import RestaurantPage from "./pages/RestaurantPage";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import './css/App.css';

function App() {
    //todo: add proper context here? Make sure it is always passed to every page?
    // const {state} = useContext(AuthContext);

    const[restaurant_data, setRestaurantData] = useState([]);
    const[user_data, setUserData] = useState([]);

    const getData = () => {
        let routes = [
            'http://localhost:5000/api/restaurant/',
            'http://localhost:5000/api/users/',
        ];
        Promise.all(routes.map((route) => axios.get(route))).then(([{data: restaurant_data}, {data: user_data}] )=> {
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
            <BrowserRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<HomePage restaurant_data={restaurant_data} />}/>
                    <Route path="/search" element={<SearchPage restaurant_data={restaurant_data} />}/>
                    <Route path="/search/:id" element={<RestaurantPage />}/>
                    <Route path="/admin" element={<AdminPage restaurant_data={restaurant_data} user_data={user_data} />}/>
                    <Route path="/UserHome" element={<UserHome/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
