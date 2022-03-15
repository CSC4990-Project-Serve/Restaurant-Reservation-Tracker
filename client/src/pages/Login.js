import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../components/authbool';

const Login = (props) => {
    let navigate = useNavigate();
    console.log(auth.loggedin);
    // need a better solution than setting defaults to []
    const [formData, setFormData] = useState({
        username: [],
        password: [],
    });

    // todo: this method is now obsolete, but could be changed to a log-out function that simply
    // todo: changes the boolean of being logged in to false and wipes any stored user info.
    // check if user is already logged in and if so, redirect home
    // useEffect(() => {
    //     if(props.isLoggedIn) {
    //         //todo: redirect home and don't allow user to login
    //     }
    // }, [])

    // Form validation (On Submission)
    function onSubmit(event) {
        event.preventDefault();

        console.warn(formData);


        if (!formData.username || !formData.password) {
            alert("NO USERNAME OR PASSWORD ENTERED");
            return;
        }

        // todo: do user authentication here?
        console.log("Doing something after submission.....");
        console.log(formData.username);
        console.log(formData.password);
        console.log(auth.loggedin);
        // todo: have this actually query the database for matches using another function
        if (formData.username === "username" && formData.password === "password") {
            auth.loggedin = true;
            auth.username = formData.username;
            auth.password = formData.password;
            console.log(auth.loggedin);
            // navigate to previous page, because for some reason this needs to be done
            // to actually load the requested restaurant page
            // todo: find a solution that doesn't involve this
            navigate(-1);
        }


        // Reset form data after submission
        // maybe move this into an else statement for handling incorrect credentials
        setFormData({username: '', password: ''});

    }

    // Form validation on data entry to a field (Updates each time a letter is entered)
    // updates the state
    function onFieldChange(event) {
        let {name, value} = event.target;

        setFormData({...formData, [name]: value})
    }

    // todo: figure out a better container for the login box
    //  ex. more centered design and box around it maybe?
    //  also would like the main container to be full height
    return (
        <div className={"container-fluid"}>
            <div className={"mb-3"}>
                <h1>Login</h1>
            </div>

            <form onSubmit={onSubmit}>
                <div className={"mb-3"}>
                    <label htmlFor="username">Username</label>
                    <input type="text" id={"username"} name={"username"}
                           className={formData.username === "" ? "form-control is-invalid" : "form-control"}
                           value={formData.username}
                           placeholder="Enter your username or email address"
                           onChange={onFieldChange}/>
                </div>

                <div className={"mb-3"}>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name={"password"}
                           className={formData.password === "" ? "form-control is-invalid" : "form-control"}
                           value={formData.password}
                           placeholder="Enter your password"
                           onChange={onFieldChange}/>
                </div>

                <div className={"mb-3 d-grid gap-2 d-md-flex justify-content-md-end"}>
                    {/*<button type={"reset"} className={"btn btn-warning button-spaced"}>Clear</button>*/}
                    <button type={"submit"} className="btn btn-primary button-spaced">Login</button>
                </div>
            </form>
        </div>);
};

export default Login;
// export class auth {
//     //loggedin = false;
//     static loggedin = false;
//     constructor(loggedin){
//         this.loggedin = loggedin;
//     }
// }