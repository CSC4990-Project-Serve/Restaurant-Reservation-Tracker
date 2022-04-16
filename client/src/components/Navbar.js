import React, {useContext} from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import {AuthContext} from "../Context/Auth.Context";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../imgs/logo.png';
import '../css/NavigationBar.css';

const NavigationBar = () => {
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
                                <NavDropdown.Item onClick={navigateUserHome}>{state.loggedin && <div>My Reservations</div>}</NavDropdown.Item>
                                <NavDropdown.Item >Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Separated link</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="nav-button">
                                <Button variant="outline-success" onClick={routeLogin}>
                                    {state.loggedin && <div>Logout</div>}
                                    {!state.loggedin && <div>Login</div>}
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