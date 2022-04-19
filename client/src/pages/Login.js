import React, {useEffect, useState, useContext} from 'react';
import { useSetState } from 'react-use';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../context/Auth.Context';
import Footer from "../components/Footer";
import NavigationBar from "../components/NavigationBar";
import '../css/Login.css';

const Login = (props) => {
    // need a better solution than setting defaults to []
    const initialState = {
        username: '',
        password: ''
    }
    const { state: ContextState, login } = useContext(AuthContext);
    const {
        loggedin,
        isPending,
        username,
        password,
        isadmin,
        loginError
    } = ContextState;
    const [state, setState] = useSetState(initialState);
    let navigate = useNavigate();

    // todo: this method is now obsolete, but could be changed to a log-out function that simply
    // todo: changes the boolean of being logged in to false and wipes any stored user info.
    // check if user is already logged in and if so, redirect home
    // useEffect(() => {
    //     if(props.isLoggedIn) {
    //         //todo: redirect home and don't allow user to login
    //     }
    // }, [])

    // Form validation (On Submission)
    const onSubmit = (event) => {
        event.preventDefault();
        const { username, password } = state;
        console.log(username);
        console.log(password);
        login(username,password);
        setState({
            username: '',
            password: ''
        });
        //console.warn(formData);
    }

    // Form validation on data entry to a field (Updates each time a letter is entered)
    // updates the state
    function onFieldChange(event) {
        let {name, value} = event.target;

        setState({...state, [name]: value})
    }

    function redirect() {
        navigate(-1)
    }

    return (
        <>
            <NavigationBar />

            <form onSubmit={onSubmit}>
                <section className="vh-100 background-area">
                    <div className="container py-5 h-100">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                                <div className="card shadow-2-strong card-area">
                                    <div className="card-body p-5 text-center">

                                        <h3 className="mb-5 text-primary">Sign in</h3>

                                        <label htmlFor="username" className="form-label text-dark">Username/Email</label>
                                                     <input type="text" id={"username"} name={"username"}
                                                            className={state.username === "" ? "form-control is-invalid" : "form-control"}
                                                            value={state.username}
                                                            placeholder="Enter your username or email address"
                                                            onChange={onFieldChange}/>

                                                     <label htmlFor="password" className={"form-label text-dark"}>Password</label>
                                                     <input type="password" id="password" name={"password"}
                                                            className={state.password === "" ? "form-control is-invalid" : "form-control"}
                                                            value={state.password}
                                                            placeholder="Enter your password"
                                                            onChange={onFieldChange}/>

                                        <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        { isPending && <div>Please wait...</div> }
                                        { loggedin && <div onLoad={redirect()}>Success.</div> }
                                        { loginError && <div>{loginError.message}</div> }
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

export default Login;