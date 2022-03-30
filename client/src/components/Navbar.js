import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from "../Context/Auth.Context";

const Navbar = () => {
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    const routeLogin = () => {
        if (!state.loggedin){
            let path = '/Login';
            navigate(path);
        }else{
            let path = '/';
            // eslint-disable-next-line no-restricted-globals
            if(confirm("Logging out?")){
                logout();
                navigate(path);
            }else{
                console.log('did not log out');
            }
        }
    }
    const routeRegister = () => {
        let path = '/Register';
        if(!state.loggedin){
            navigate(path);
        }else{
            alert("Already Logged in, logout to Register")
        }
    }

    return (
        <div>
            <nav className="navbarHeader navbar-light bg-light">
                <span className="navbar-brand mb-0 h1">Project Serve</span>
            </nav>
            <div className="navbarBelow bg-light">
                <div className="row">
                    <div className="col linkLeft">
                        <NavLink to={"/"}>
                            Home <span className="sr-only">(current)</span>
                        </NavLink>
                    </div>
                    <div className="col linkRight">
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" onClick={routeLogin} className="btn btn-secondary">
                                {state.loggedin && <div>Logout</div>}
                                {!state.loggedin && <div>Login</div>}
                            </button>
                            <button type="button" onClick={routeRegister} className="btn btn-secondary">Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;