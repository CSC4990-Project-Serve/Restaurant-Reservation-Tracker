import React, {useEffect, useState, useContext} from 'react';
import { useSetState } from 'react-use';
import {useNavigate} from 'react-router-dom';
import Footer from "../components/Footer";
import NavigationBar from "../components/Navbar";
import {AuthContext} from '../Context/Auth.Context';
import '../css/Login.css';

const Register = (props) => {
    // Registration Field Names: username, email_address, first_name,
    // last_name, phone_number, hashed_password
    const initialState = {
        username: '',
        emailAddress:'',
        firstName:'',
        lastName:'',
        phoneNumber:'',
        password: ''
    }
    const { state: ContextState, register } = useContext(AuthContext);
    const {
        loggedin,
        isPending,
        username,
        emailAddress,
        fName,
        lName,
        password,
        isadmin,
        loginError
    } = ContextState;
    const [state, setState] = useSetState(initialState);
    let navigate = useNavigate()

    // Form validation (On Submission)
    const onSubmit = (event) => {
        event.preventDefault();
        //console.warn(formData);
        alert("username: " + state.username + "\nemail: " + state.emailAddress + "\nfname: " + state.firstName +
        "\nlname: " + state.lastName + "\nphoneNumber: " + state.phoneNumber + "\npassword: " + state.password);
        //ToDo: on successful account creation, navigate back a page, otherwise display message
        const { username, password } = state;
        register(username,emailAddress,fName,lName,password);
        // if (username === "username" && password === "password"){
        //     //ToDo: hash password if account available, as well as upload all info to database
        //     alert("registration successful")
        //     register(username,emailAddress,fName,lName,password);
        //     navigate(-1);
        // }else{
        //     alert("account unnavailable, try again");
        // }
    }

    function redirect() {
        navigate(-1);
    }

    // Form validation on data entry to a field (Updates each time a letter is entered)
    // updates the state
    function onFieldChange(event) {
        let {name, value} = event.target;

        setState({...state, [name]: value})
    }
    return (
        <><NavigationBar />
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
                                    <label htmlFor="emailAddress" className="form-label text-dark">Email Address</label>
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
                                    <label htmlFor="phoneNumber" className="form-label text-dark">Phone Number</label>
                                    <input type="text" id={"phoneNumber"} name={"phoneNumber"}
                                           className={"form-control"}
                                           value={state.phoneNumber}
                                           placeholder="1-111-111-1111"
                                           onChange={onFieldChange}/>
                                    <label htmlFor="password" className={"form-label text-dark"}>Password</label>
                                    <input type="password" id="password" name={"password"}
                                           className={"form-control"}
                                           value={state.password}
                                           placeholder="Enter a password"
                                           onChange={onFieldChange}/>

                                    <button className="btn btn-primary btn-lg btn-block" type="submit">Register</button>
                                    { isPending && <div className={'text-dark'}>Please wait...</div> }
                                    { loggedin && <div className={'text-dark'} onLoad={redirect()}>Success.</div> }
                                    { loginError && <div className={'text-dark'}>{loginError.message}</div> }
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

export default Register;