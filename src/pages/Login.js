import React, {Component} from 'react';

class Login extends Component {

    submitForm (e) {
        e.preventDefault()
        //this.props.history.push('./Main'); // <--- The page you want to redirect your user to.
    }

    render() {
        return (
            <div>
                <form onSubmit={this.submitForm.bind(this)} className="login-form d-flex">
                    <div className="container form-container">
                        <div className="row title-row">
                            <h1>Project Serve Login</h1>
                        </div>
                        <div className="row">
                            <label htmlFor="username">Username</label>
                            <input type="text" name={"username"} id="username" className="form-control" placeholder="username"></input>
                        </div>
                        <div className="row">
                            <label htmlFor="password">Password</label>
                            <input type="password" name={"password"} id="password" className="form-control" placeholder="password"></input>
                        </div>
                        <div className="row form-group login-cancel-buttons">
                            <button type="button" className="btn btn-secondary button-spaced">Cancel</button>
                            <button type="submit" className="btn btn-primary button-spaced">Login</button>
                        </div>
                    </div>
                </form>
            </div>

        );
    }
}

export default Login;
