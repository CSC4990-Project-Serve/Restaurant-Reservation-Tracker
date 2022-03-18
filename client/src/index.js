import React, { useContext, createContext, useState } from "react";
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import App from "./App";
import {ContextProvider} from "./Context/Auth.Context";

// Root element in HTML DOM to render React components within
const rootElement = document.getElementById('root')

function AppWithProvider() {
    return (
        <ContextProvider value={500}>
            <App />
        </ContextProvider>
    );
}

ReactDOM.render(<AppWithProvider />, rootElement);


// Currently, Unused Below
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
