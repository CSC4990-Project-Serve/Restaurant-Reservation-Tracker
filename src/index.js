import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {
    Login,
    Main,
    Restaurant,
    Navbar,
    Footer,
} from "./components";
import reportWebVitals from './reportWebVitals';

// Root element in HTML DOM to render React components within
const rootElement = document.getElementById('root')

ReactDOM.render(
    <Router>
        <Navbar/>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Main" element={<Main />} />
        </Routes>
        <Footer/>
    </Router>,

    rootElement
);

// Currently, Unused Below
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
