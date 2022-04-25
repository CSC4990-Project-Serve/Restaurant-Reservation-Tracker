import {useContext, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import {Button, Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import logo from '../imgs/logo.png';
import '../css/NavigationBar.css';
import {use} from "bcrypt/promises";

const saveToLocalStorage = (state) => {
    try {
        localStorage.setItem('userProfileData', JSON.stringify(state));
    } catch (e) {
        console.error(e);
    }
};
const NavigationBar = () => {

    const navigate = useNavigate();
    const {userProfileData, setUserProfileData} = useContext(UserContext);
    // const {logout} = useContext(AuthContext);

    //console.log(`userState in NavBar: ${JSON.stringify(userProfileData)}`);


    const routeLogin = () => {
        if (!userProfileData.loggedIn) {
            let path = '/login';
            navigate(path);
        } else {
            let path = '/';
            // eslint-disable-next-line no-restricted-globals
            if (confirm("Logging out?")) {
                    setUserProfileData({
                        loggedIn: false,
                        isAdmin: false,
                        loginError: null,
                        user: {
                            id: null,
                            username: null,
                            email_address: null,
                            first_name: null,
                            last_name: null,
                            phone_number: null,
                        },
                    });
                    saveToLocalStorage({
                        loggedIn: false,
                        isAdmin: false,
                        loginError: null,
                        user: {
                            id: null,
                            username: null,
                            email_address: null,
                            first_name: null,
                            last_name: null,
                            phone_number: null,
                        },
                    })
                navigate(path);
            } else {
                console.log('did not log out');
            }
        }
    }

    const routeRegister = () => {
        let path = '/register';
        if (!userProfileData.loggedIn) {
            navigate(path);
        } else {
            alert("Already Logged in, logout to RegisterPage")
        }
    }

    function navigateUserHome() {
        let path = '/UserHome';
        if (!userProfileData.loggedIn) {
            navigate('/login');
        } else {
            navigate(path);
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
                                <NavDropdown.Item onClick={navigateUserHome}>My Reservations</NavDropdown.Item>
                                <NavDropdown.Item href="/search">Search</NavDropdown.Item>

                                <NavDropdown.Divider/>
                                <NavDropdown.Item href="/admin">Administrator Tools</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Item className="nav-button">
                                <Button variant="outline-success" onClick={routeLogin}>
                                    {userProfileData.loggedIn ? "Sign Out" : "Sign In"}
                                </Button>
                            </Nav.Item>
                            {
                                // only show register button if not logged in
                                !userProfileData.loggedIn &&
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