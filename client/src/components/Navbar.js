import React, {useContext, useMemo, useState} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {UserContext} from "../Context/UserContext";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../imgs/logo.png';
import '../css/NavigationBar.css';
import {logout} from "./utils/logout";

const NavigationBar = () => {
    const navigate = useNavigate();
    const { user,setUser } = useContext(UserContext);

    const routeLogin = () => {
        if (!user.loggedin){
            let path = '/LoginPage';
            navigate(path);
        }else{
            let path = '/';
            // eslint-disable-next-line no-restricted-globals
            if(confirm("Logging out?")){
                setUser(logout());
                navigate(path);
            }else{
                console.log('did not log out');
            }
        }
    }
    const routeRegister = () => {
        let path = '/RegisterPage';
        if(!user.loggedin){
            navigate(path);
        }else{
            alert("Already Logged in, logout to RegisterPage")
        }
    }

    function navigateUserHome() {
        navigate("/UserHome");
    }

    function navigateHome() {
        navigate("/");
    }

    return (
        <>
            <Navbar sticky="top" className="navbar-color" expand="lg">
                <Container className="navbar-container" fluid >

                    <Navbar.Brand onClick={navigateHome}>
                        <img
                            alt="Project Serve Logo"
                            src={logo}
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>

                    <Navbar.Brand className="nav-title">Project Serve</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="container-fluid"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <NavDropdown title="More" id="collapsible-nav-dropdown"  className="ms-auto">
                                <NavDropdown.Item onClick={navigateHome}>Home</NavDropdown.Item>
                                <NavDropdown.Item onClick={navigateUserHome}>{user.loggedin && <div>My Reservations</div>}</NavDropdown.Item>
                                <NavDropdown.Item >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="nav-button">
                                <Button variant="outline-success" onClick={routeLogin}>
                                    {user.loggedin && <div>Logout</div>}
                                    {!user.loggedin && <div>Login</div>}
                                </Button>
                            </Nav.Item>
                            <Nav.Item className="nav-button">
                                <Button variant="primary" onClick={routeRegister}>Sign up</Button>
                            </Nav.Item>
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
};


export default NavigationBar;