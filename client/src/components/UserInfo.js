import React, {useContext, useState} from "react";
import {UserContext} from "../context/UserContext";
import {Button, Form} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";

// TODO: when updating, database updates but cookies dont update client on reload...
// TODO: when making multiple updates in one user log in session, db is restoring previous values because of issue above.

const UserInfo = () => {
    const {userProfileData} = useContext(UserContext);
    const[updateActive, setUpdateActive] = useState(false);
    const[choice, setChoice] = useState("")

    const showUpdateComponent = () => {
        setUpdateActive(true);
    }

    const[username, setUsername] = useState(userProfileData.user.username);
    const[email_address, setEmail] = useState(userProfileData.user.email_address);
    const[phone_number, setUserPhone] = useState(userProfileData.user.phone_number);
    const[first_name, setFirstName] = useState(userProfileData.user.first_name);
    const[last_name, setLastName] = useState(userProfileData.user.last_name);
    const id = userProfileData.user.id


    const handleUserUpdate = () => {
        const updated_user = {id, username, email_address, first_name, last_name, phone_number};

        fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
            method: 'PUT',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(updated_user)
        }).then(() => {
            console.log("Update successful.");
        });
        alert("Update successful.");
    }

    const UpdateForm = () => {
        if(choice === "Username") {
            return (
                <Form onSubmit={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Control type="text" defaultValue={userProfileData.user.username} className="mb-3" onChange= {(e) => setUsername(e.target.value)} />
                        <Button type="submit" className="update-buttons">Save</Button>
                        <Button type="button" className="update-buttons" onClick={() => window.location.reload()}>Cancel</Button>
                    </Form.Group>
                </Form>
            )
        } else if(choice === "Phone") {
            return (
                <Form onSubmit={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="phone_number">
                        <Form.Control type="text" defaultValue={userProfileData.user.phone_number} className="mb-3" onChange= {(e) => setUserPhone(e.target.value)} />
                        <Button type="submit" className="update-buttons">Save</Button>
                        <Button type="button" className="update-buttons" onClick={() => window.location.reload()}>Cancel</Button>
                    </Form.Group>
                </Form>
            )
        } else if(choice === "Email") {
            return (
                <Form onSubmit={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="email_address">
                        <Form.Control type="text" defaultValue={userProfileData.user.email_address} className="mb-3" onChange= {(e) => setEmail(e.target.value)} />
                        <Button type="submit" className="update-buttons">Save</Button>
                        <Button type="button" className="update-buttons" onClick={() => window.location.reload()}>Cancel</Button>
                    </Form.Group>
                </Form>
            )
        } else if(choice === "First Name") {
            return (
                <Form onSubmit={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="first_name">
                        <Form.Control type="text" defaultValue={userProfileData.user.first_name} className="mb-3" onChange= {(e) => setFirstName(e.target.value)} />
                        <Button type="submit" className="update-buttons">Save</Button>
                        <Button type="button" className="update-buttons" onClick={() => window.location.reload()}>Cancel</Button>
                    </Form.Group>
                </Form>
            )
        } else if(choice === "Last Name") {
            return (
                <Form onSubmit={handleUserUpdate}>
                    <Form.Group className="mb-3" controlId="last_name">
                        <Form.Control type="text" defaultValue={userProfileData.user.last_name} className="mb-3" onChange= {(e) => setLastName(e.target.value)} />
                        <Button type="submit" className="update-buttons">Save</Button>
                        <Button type="button" className="update-buttons" onClick={() => window.location.reload()}>Cancel</Button>
                    </Form.Group>
                </Form>
            )
        } else {
            return null;
        }
    }

   return (
       <>
           <h2>Update account information.</h2>
           <div className="custom-twitter-widget">
               <div className="info-container" onClick={() => showUpdateComponent(setChoice("First Name"))}>
                   <h3>First Name</h3>
                   {!updateActive ? <MDBIcon fas icon="chevron-right" className="chevron-styles"/> : null }
                   {updateActive && choice === "First Name" ? UpdateForm() : <p className={updateActive ? "updated-text" : "regular-text"}>{userProfileData.user.first_name}</p>}
               </div>
               <div className="info-container" onClick={() => showUpdateComponent(setChoice("Last Name"))}>
                   <h3>Last Name</h3>
                   {!updateActive ? <MDBIcon fas icon="chevron-right" className="chevron-styles"/> : null }
                   {updateActive && choice === "Last Name" ? UpdateForm() : <p className={updateActive ? "updated-text" : "regular-text"}>{userProfileData.user.last_name}</p>}
               </div>
               <div className="info-container" onClick={() => showUpdateComponent(setChoice("Username"))}>
                   <h3>Username</h3>
                   {!updateActive ? <MDBIcon fas icon="chevron-right" className="chevron-styles"/> : null }
                   {updateActive && choice === "Username" ? UpdateForm() : <p className={updateActive ? "updated-text" : "regular-text"}>{userProfileData.user.username}</p>}
               </div>
               <div className="info-container" onClick={() => showUpdateComponent(setChoice("Phone"))}>
                   <h3>Phone</h3>
                   {!updateActive ? <MDBIcon fas icon="chevron-right" className="chevron-styles"/> : null }
                   {updateActive && choice === "Phone" ? UpdateForm() : <p className={updateActive ? "updated-text" : "regular-text"}>{userProfileData.user.phone_number}</p>}
               </div>
               <div className="info-container" onClick={() => showUpdateComponent(setChoice("Email"))}>
                   <h3>Email</h3>
                   {!updateActive ? <MDBIcon fas icon="chevron-right" className="chevron-styles"/> : null }
                   {updateActive && choice === "Email" ? UpdateForm() : <p className={updateActive ? "updated-text" : "regular-text"}>{userProfileData.user.email_address}</p>}
               </div>
           </div>
       </>
   )
}

export default UserInfo;