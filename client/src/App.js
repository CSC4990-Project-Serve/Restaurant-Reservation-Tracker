import {useContext, useEffect, useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "./context/Auth.Context";
import HomePage from './pages/HomePage'
import SearchPage from "./pages/SearchPage";
import RestaurantPage from "./pages/RestaurantPage";
import AdminPage from "./pages/AdminPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";

function App() {
    //todo: add proper context here? Make sure it is always passed to every page?
    const {state} = useContext(AuthContext);

    const[restaurant_data, setRestaurantData] = useState([]);
    const[user_data, setUserData] = useState([]);

    let restaurant_route = "http://localhost:5000/api/restaurant/";
    let user_route = "http://localhost:5000/api/users/";

    const requestOne = axios.get(restaurant_route);
    const requestTwo = axios.get(user_route);

    useEffect(() => {
        axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
            const restaurants = responses[0];
            const users = responses[1];
            setRestaurantData(restaurants.data);
            setUserData(users.data);
        })).catch(errors => {
            console.log(errors);
        })
    }, [])


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<HomePage restaurant_data={restaurant_data} />}/>
                    <Route path="/search" element={<SearchPage restaurant_data={restaurant_data} />}/>
                    <Route path="/search/:id" element={<RestaurantPage />}/>
                    <Route path="/admin" element={<AdminPage restaurant_data={restaurant_data} user_data={user_data} />}/>
                    <Route path={"/UserHome"} element={<UserHome/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
