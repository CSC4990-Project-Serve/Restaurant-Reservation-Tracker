import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from "../Context/Auth.Context";

const Navbar = () => {
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

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
                        <NavLink to={"/Login"}>
                            Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Navbar;