import React, {useState} from 'react';

const Login = (props) => {

    // need a better solution than setting defaults to []
    const [formData, setFormData] = useState({
        username: [],
        password: [],
    });

    // Form validation (On Submission)
    function onSubmit(event) {
        event.preventDefault();

        console.warn(formData);


        if (!formData.username || !formData.password) {
            alert("NO USERNAME OR PASSWORD ENTERED");
            return;
        }

        // todo: do user authentication here?
        console.log("Doing something after submission.....")

        // Reset form data after submission
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