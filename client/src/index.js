import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
import App from './App.js';
import {ContextProvider} from "./context/Auth.Context";


const rootElement = document.getElementById('root')

function AppWithProvider() {
    return (
        <ContextProvider value={500}>
            <App />
        </ContextProvider>
    );
}

ReactDOM.render(<AppWithProvider />, rootElement);