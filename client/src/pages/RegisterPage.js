import React, {useEffect, useState, useContext} from 'react';
import {useSetState} from 'react-use';
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import {UserContext} from "../context/UserContext";
import '../css/Login.css';
import $ from "jquery";
import axios from "axios";

const bcrypt = require('bcryptjs');


const RegisterPage = (props) => {
    // Registration Field Names: username, email_address, first_name,
    // last_name, phone_number, hashed_password
    const initialState = {
        username: '',
        emailAddress: '',
        firstName: '',
        lastName: '',
        phone_number: '',
        password: ''
    }
    const {userProfileData, setUserProfileData} = useContext(UserContext);
    const [state, setState] = useSetState(initialState);
    let navigate = useNavigate()

    // Form validation (On Submission)
    const onSubmit = async (event) => {
        event.preventDefault();
        //console.warn(formData);
        alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
            "\nlname: " + state.lastName + "\nphoneNumber: " + state.phone_number + "\npassword: " + state.password);
        //ToDo: on successful account creation, navigate back a page, otherwise display message
        const {username, emailAddress, phone_number, firstName, lastName, password} = state;
        //await register(username, emailAddress, firstName, lastName, password, phone_number);
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(password, salt);
        const userInfo = {
            username: username,
            email_address: emailAddress,
            first_name: firstName,
            last_name: lastName,
            phone_number: phone_number,
            hashed_password: hash,
            password_salt: salt
        }
        // ToDo: currently hardcoded, have it actually check database using user model
        axios.post(`http://localhost:5000/api/users`, {...userInfo}, {
            headers: {
                "access-control-allow-origin": "*",
            }
        })
            .then(response => {
                //console.log(response);
                setUserProfileData({
                    loggedIn: true,
                    isAdmin: false,
                    loginError: false,
                    user: {
                        id: response.data.userId,
                        username: userInfo.username,
                        email_address: userInfo.email_address,
                        first_name: userInfo.first_name,
                        last_name: userInfo.last_name,
                        phone_number: userInfo.phone_number,
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
                        loginError: err,
                        user: {},
                    })
                    console.log(err);
                }
            });
    }

    function redirect() {
        navigate("/");
    }

    // Form validation on data entry to a field (Updates each time a letter is entered)
    // updates the state
    function onFieldChange(event) {
        let {name, value} = event.target;

        setState({...state, [name]: value})
    }

    return (
        <><NavigationBar/>
            <form onSubmit={onSubmit}>
                <section className="vh-150 background-area">
                    <div className="container py-5 h-150">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong card-area">
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5 text-primary">Register</h3>

                                        <label htmlFor="username" className="form-label text-dark">Username</label>
                                        <input type="text" id={"username"} name={"username"}
                                               className={"form-control"}
                                               value={state.username}
                                               placeholder="Enter a username"
                                               onChange={onFieldChange}/>
                                        <label htmlFor="emailAddress" className="form-label text-dark">Email
                                            Address</label>
                                        <input type="text" id={"emailAddress"} name={"emailAddress"}
                                               className={"form-control"}
                                               value={state.emailAddress}
                                               placeholder="Enter your email address"
                                               onChange={onFieldChange}/>
                                        <label htmlFor="firstName" className="form-label text-dark">First Name</label>
                                        <input type="text" id={"firstName"} name={"firstName"}
                                               className={"form-control"}
                                               value={state.firstName}
                                               placeholder="Enter your First Name"
                                               onChange={onFieldChange}/>
                                        <label htmlFor="lastName" className="form-label text-dark">Last Name</label>
                                        <input type="text" id={"lastName"} name={"lastName"}
                                               className={"form-control"}
                                               value={state.lastName}
                                               placeholder="Enter your Last Name"
                                               onChange={onFieldChange}/>
                                        <label htmlFor="phone_number" className="form-label text-dark">Phone
                                            Number</label>
                                        <input type="text" id={"phone_number"} name={"phone_number"}
                                               className={"form-control"}
                                               value={state.phone_number}
                                               placeholder="1-111-111-1111"
                                               onChange={onFieldChange}/>
                                        <label htmlFor="password" className={"form-label text-dark"}>Password</label>
                                        <input type="password" id="password" name={"password"}
                                               className={"form-control"}
                                               value={state.password}
                                               placeholder="Enter a password"
                                               onChange={onFieldChange}/>

                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Register
                                        </button>
                                        {userProfileData.loggedin &&
                                        <div className={'text-dark'} onLoad={redirect()}>Success.</div>}
                                        {userProfileData.loginError &&
                                        <div className={'text-dark'}>{userProfileData.loginError.message}</div>}
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

export default RegisterPage;