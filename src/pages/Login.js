import React from 'react';

const Login = () => {
    return (
        <div>
            <form action="" className="login-form d-flex">
                <div className="container form-container">
                    <div className="row title-row">
                        <h1>Project Serve Login</h1>
                    </div>
                    <div className="row">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" className="form-control" placeholder="username"></input>
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="form-control" placeholder="password"></input>
                    </div>
                    <div className="row form-group login-cancel-buttons">
                        <button type="button" className="btn btn-secondary button-spaced">Cancel</button>
                        <button type="submit" className="btn btn-primary button-spaced">Login</button>
                    </div>
                </div>
            </form>
            <footer className="page-footer font-small blue bg-light">
                <div className="footer-copyright text-center py-3">© 2022 Copyright:
                    <a href=""> The Coding Connoisseurs</a>
                </div>
            </footer>
        </div>

    );
};

export default Login;