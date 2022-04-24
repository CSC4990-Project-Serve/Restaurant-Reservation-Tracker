import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import '../css/AdminPage.css';
import bcrypt from "bcryptjs";

const AdminCreate = (props) => {
    const navigate = useNavigate();
    const {choice, restaurant_data, user_data} = props;

    //restaurants functionality
    const[restaurant_name, setRestaurantName] = useState("Restaurant Name");
    const[restaurant_phone_number, setRestaurantPhone] = useState("123-456-7890");
    const[restaurant_description, setRestaurantDescription] = useState("Description Stuff");
    const[address1, setAddress1] = useState("123 Main St");
    const[city, setCity] = useState("City");
    const[state, setState] = useState("State");
    const[postal_code, setPostalCode] = useState("12345");
    const[hours_open, setHoursOpen] = useState("12:00PM");
    const[hours_close, setHoursClose] = useState("9:00PM")

    const handleRestaurantSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        const new_restaurant = {restaurant_name, restaurant_phone_number, restaurant_description, address1, city, state, postal_code, hours_open, hours_close};

        fetch("http://localhost:5000/api/restaurant", {
            method: 'POST',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(new_restaurant)
        }).then(() => {
            console.log("Done")
        });
    }

    const RestaurantForm = () => {
        return (
            <Form onSubmit={handleRestaurantSubmit} className="restaurant-form">
                <Row>
                    <Form.Group className="mb-3" as={Col} controlId="restaurant_name">
                        <Form.Label>Restaurant Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" required value={restaurant_name} onChange= {(e) => setRestaurantName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="restaurant_phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter phone" required value={restaurant_phone_number} onChange= {(e) => setRestaurantPhone(e.target.value)} />
                    </Form.Group>
                </Row>
                <Form.Group className="mb-3" as={Col} controlId="restaurant_description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="Enter description" required value={restaurant_description} onChange= {(e) => setRestaurantDescription(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address1">
                    <Form.Label>Address</Form.Label>
                    <Form.Control placeholder="1234 Main St" required value={address1} onChange= {(e) => setAddress1(e.target.value)} />
                </Form.Group>
                <Row>
                    <Form.Group className="mb-3" as={Col} controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control placeholder="Enter city" required value={city} onChange= {(e) => setCity(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control placeholder="Enter state" required value={state} onChange= {(e) => setState(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="postal_code">
                        <Form.Label>Postal Code</Form.Label>
                        <Form.Control placeholder="Enter zip" required value={postal_code} onChange= {(e) => setPostalCode(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" as={Col} controlId="hours_open">
                        <Form.Label>Opening Hours</Form.Label>
                        <Form.Select required value={hours_open} onChange= {(e) => setHoursOpen(e.target.value)} >
                            <option disabled={true}>Choose...</option>
                            <option value="10:00AM">10:00AM</option>
                            <option value="10:30AM">10:30AM</option>
                            <option value="11:00AM">11:00AM</option>
                            <option value="11:30AM">11:30AM</option>
                            <option value="12:00PM">12:00PM</option>
                            <option value="12:30PM">12:30PM</option>
                            <option value="1:00PM">1:00PM</option>
                            <option value="1:30PM">1:30PM</option>
                            <option value="2:00PM">2:00PM</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="close_hours">
                        <Form.Label>Closing Hours</Form.Label>
                        <Form.Select required value={hours_close} onChange= {(e) => setHoursClose(e.target.value)} >
                            <option disabled={true}>Choose...</option>
                            <option value="5:00PM">5:00PM</option>
                            <option value="5:30PM">5:30PM</option>
                            <option value="6:00PM">6:00PM</option>
                            <option value="6:30PM">6:30PM</option>
                            <option value="7:00PM">7:00PM</option>
                            <option value="7:30PM">7:30PM</option>
                            <option value="8:00PM">8:00PM</option>
                            <option value="8:30PM">8:30PM</option>
                            <option value="9:00PM">9:00PM</option>
                            <option value="9:30PM">9:30PM</option>
                            <option value="10:00PM">10:00PM</option>
                            <option value="10:30PM">10:30PM</option>
                            <option value="11:00PM">11:00PM</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }

    //users functionality
    const[username, setUsername] = useState("username");
    const[email_address, setEmail] = useState("project@serve.live");
    const[first_name, setFirstName] = useState("John");
    const[last_name, setLastName] = useState("Doe");
    const[phone_number, setUserPhone] = useState("123-456-7890");
    // const[password, setPassword] = useState("default password")
    // const[salt, setSalt] = useState("");


    //TODO: FIX THIS, ask Jared for input, dont really know how hashing and salting works
    const bcrypt = require('bcryptjs');
    let salt = bcrypt.genSaltSync(10);
    let hashed_password = bcrypt.hashSync("default_password", salt)

    // console.log(`salt: ${salt} \nhashedPass: ${password}`)


    const handleUserSubmit = (e) => {
        e.preventDefault(); // prevent page from auto refresh
        const new_user = {username, email_address, first_name, last_name, phone_number, hashed_password, salt};


        console.log(JSON.stringify(new_user));

        fetch("http://localhost:5000/api/users", {
            method: 'POST',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(new_user)
        }).then(() => {
            console.log("Done")
        });
    }

    const UserForm = () => {
        return (
            <Form onSubmit={handleUserSubmit} className="restaurant-form">
                <Row>
                    <Form.Group className="mb-3" as={Col} controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" required value={username} onChange= {(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="email_address">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" required value={email_address} onChange= {(e) => setEmail(e.target.value)} />
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3" as={Col} controlId="first_name">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter first name" required value={first_name} onChange= {(e) => setFirstName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="last_name">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter last name" required value={last_name} onChange= {(e) => setLastName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="phone_number">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="tel" placeholder="Enter phone" required value={phone_number} onChange= {(e) => setUserPhone(e.target.value)} />
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
        )
    }

    return (
        <>
            {choice === "Restaurants" ? RestaurantForm() : UserForm()}
        </>
    )
}

export default AdminCreate;