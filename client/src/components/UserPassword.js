import React, {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Button, Form} from "react-bootstrap";
import bcrypt from "bcryptjs";

const UserPassword = () => {
    const {userProfileData} = useContext(UserContext);

    const id = userProfileData.user.id
    const username = userProfileData.user.username;
    const email_address = userProfileData.user.email_address;
    const phone_number = userProfileData.user.phone_number;
    const first_name = userProfileData.user.first_name;
    const last_name = userProfileData.user.last_name;
    const[current_password, setCurrentPassword] = useState("");
    const[new_password, setNewPassword] = useState("");
    const[confirm_password, setConfirmPassword] = useState("");

    //TODO: figure out why update is not working, made route and controller from existing model "User.update_user_with_new_password"
    // not working, does make sure it validates inputs
    const handlePasswordUpdate = (e) => {
        // e.preventDefault();

        const confirm_current_password = {username, email_address, password: current_password}

        fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(confirm_current_password)
        }).then(() => {
            console.log("Correct password.");

            if(new_password === "" || confirm_password === "")
            {
                alert("Fill out all fields.");
            } else if(new_password !== confirm_password)  {
                alert("Password do not match. Please try again.");
            } else {
                // alert("passwords match");
                let password_salt = bcrypt.genSaltSync(10);
                let hashed_password = bcrypt.hashSync(confirm_password, password_salt)

                const updated_user_password = {id, username, email_address, first_name, last_name, phone_number, hashed_password, password_salt};

                console.log(JSON.stringify(updated_user_password));
                fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                    method: 'PUT',
                    headers: {"Content-type": "application/json" },
                    body: JSON.stringify(updated_user_password)
                }).then(() => {
                    console.log("Update successful.");
                });
            }
        });
    }

    return (
        <>
            <h2>Change your password.</h2>
            <div className="custom-twitter-widget2">
                <Form onSubmit={handlePasswordUpdate}>
                    <div className="pw-container-current">
                        <Form.Control type="password" placeholder="Current password" onChange= {(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="pw-container">
                        <Form.Control type="password" placeholder="New password" onChange= {(e) => setNewPassword(e.target.value)} />
                    </div>
                    <div className="pw-container">
                        <Form.Control type="password" placeholder="Confirm password" onChange= {(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="pw-button">Confirm</Button>
                </Form>
            </div>
        </>
    )
};

export default UserPassword;