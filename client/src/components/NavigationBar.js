import {useContext} from 'react';
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../context/Auth.Context";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../imgs/logo.png';
import '../css/NavigationBar.css';

const NavigationBar = () => {
    const navigate = useNavigate();
    // const {state} = useContext(AuthContext);
    const state = {};
    // const {logout} = useContext(AuthContext);
    const logout = null;

    const routeLogin = () => {
        if (!state.loggedin) {
            let path = '/login';
            navigate(path);
        } else {
            let path = '/';
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Logging out?")) {
                logout();
                navigate(path);
            } else {
                console.log('did not log out');
            }
        }
    }

    const routeRegister = () => {
        let path = '/register';
        if (!state.loggedin) {
            navigate(path);
        } else {
            alert("Already Logged in, logout to Register")
        }
    }

    return (
        <>
            <Navbar sticky="top" className="navbar-color" expand="lg">
                <Container className="navbar-container" fluid>

                    <Navbar.Brand href="/">
                        <img
                            alt="Project Serve Logo"
                            src={logo}
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>

                    <Navbar.Brand className="nav-title">Project Serve</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="container-fluid"
                            style={{maxHeight: '100px'}}
                            navbarScroll
                        >
                            <NavDropdown title="More" id="collapsible-nav-dropdown" className="ms-auto">
                                <NavDropdown.Item href="/">Home</NavDropdown.Item>
                                <NavDropdown.Item href="/search">Search</NavDropdown.Item>

                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/admin">Administrator Tools</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="nav-button">
                                <Button variant="outline-success" onClick={routeLogin}>
                                    {state.loggedin ? "Sign Out" : "Sign In"}
                                </Button>
                            </Nav.Item>
                            {
                                // only show register button if not logged in
                                !state.loggedin &&
                                <Nav.Item className="nav-button2">
                                    <Button variant="primary" onClick={routeRegister}>Register</Button>
                                </Nav.Item>
                            }
                        </Nav>
                    </Navbar.Collapse>

                </Container>
            </Navbar>
        </>
    )
};


export default NavigationBar;