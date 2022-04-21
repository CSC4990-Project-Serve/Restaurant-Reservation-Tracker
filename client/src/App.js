import {useContext} from "react";
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

    //todo: add proper context here? Make sure it is always passed to every page?
    const {state} = useContext(AuthContext);


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path="/search/:id" element={<RestaurantPage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                    <Route path={"/UserHome"} element={<UserHome/>}/>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
