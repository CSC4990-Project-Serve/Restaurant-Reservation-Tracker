import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import ReactDOM from 'react-dom';
import App from './App.js';


const rootElement = document.getElementById('root')

function AppWithProvider() {
    return (
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    );
}

ReactDOM.render(<AppWithProvider/>, rootElement);