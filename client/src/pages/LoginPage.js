import React, {useEffect, useState, useContext} from 'react';
import {useSetState} from 'react-use';
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import '../css/Login.css';
import {UserContext} from "../context/UserContext";
import axios from "axios";

const LoginPage = (props) => {
    // need a better solution than setting defaults to []
    const initialState = {
        username: '',
        password: '',
        loggedin: false,
        loginError: null
    }

    const {userProfileData, setUserProfileData} = useContext(UserContext);
    const [loginFormInformation, setLoginFormInformation] = useSetState(initialState);

    let navigate = useNavigate();

    // Form validation (On Submission)
    const onSubmit = async (event) => {
        event.preventDefault();

        const {username, password} = loginFormInformation;

        const userInfo = {
            username: username,
            email_address: username,
            password: password,
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/login`, {...userInfo}, {
            headers: {
                "access-control-allow-origin": "*",
            }
        })
            .then(response => {
                setUserProfileData({
                    loggedIn: true,
                    isAdmin: false,
                    loginError: false,
                    user: {
                        id: response.data[0].id,
                        username: response.data[0].username,
                        email_address: response.data[0].email_address,
                        first_name: response.data[0].first_name,
                        last_name: response.data[0].last_name,
                        phone_number: response.data[0].phone_number,
                    },
                })

                redirect();
            })
            //.then(response => console.log(response.data[0]))
            .catch(err => {
                if (err) {
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
                        }
                    })
                    console.log(err);
                }
            });
    }

    // Form validation on data entry to a field (Updates each time a letter is entered)
    // updates the loginFormInformation
    function onFieldChange(event) {
        let {name, value} = event.target;

        setLoginFormInformation({...loginFormInformation, [name]: value})
    }

    function redirect() {
        navigate('/')
    }

    return (
        <><NavigationBar/>
            <form onSubmit={onSubmit}>
                <section className="vh-100 background-area">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong card-area">
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5 text-primary">Sign in</h3>

                                        <label htmlFor="username"
                                               className="form-label text-dark">Username/Email</label>
                                        <input type="text" id={"username"} name={"username"}
                                               className={loginFormInformation.username === "" ? "form-control is-invalid" : "form-control"}
                                               value={loginFormInformation.username}
                                               placeholder="Enter your username or email address"
                                               onChange={onFieldChange}/>

                                        <label htmlFor="password" className={"form-label text-dark"}>Password</label>
                                        <input type="password" id="password" name={"password"}
                                               className={loginFormInformation.password === "" ? "form-control is-invalid" : "form-control"}
                                               value={loginFormInformation.password}
                                               placeholder="Enter your password"
                                               onChange={onFieldChange}/>

                                        <br/>
                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Login
                                        </button>
                                        {!userProfileData.loggedin && <div>Login</div>}
                                        {userProfileData.loggedin && <div>Success.</div>}
                                        {userProfileData.loginError && <div>invalid username/password combo</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Footer/>
        </>
    );
};

export default LoginPage;