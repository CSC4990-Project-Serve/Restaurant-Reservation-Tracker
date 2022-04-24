import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";


//TODO: implement update prop and refresh functionality
const AdminUpdate = (props) => {
    //Global Properties:
    const{choice, update, id } = props;

    // User Properties:
    const {old_username, old_email_address, old_first_name, old_last_name, old_phone_number} = props;
    const[username, setUsername] = useState(old_username);
    const[email_address, setEmail] = useState(old_email_address);
    const[first_name, setFirstName] = useState(old_first_name);
    const[last_name, setLastName] = useState(old_last_name);
    const[phone_number, setUserPhone] = useState(old_phone_number);

    // done
    const handleUserUpdate = (e) => {
        e.preventDefault();
        const updated_user = {id, username, email_address, first_name, last_name, phone_number};

        console.log(JSON.stringify(updated_user));

        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'PUT',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(updated_user)
        }).then(() => {
            console.log("Done")
        });
    }
    const UserUpdateForm = () => {
        return (
            <>
                <h2 className="update-header">Make changes as necessary.</h2>
                <Form onSubmit={handleUserUpdate}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="username">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" defaultValue={old_username} onChange= {(e) => setUsername(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" defaultValue={old_email_address} onChange= {(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="first_name">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" defaultValue={old_first_name} onChange= {(e) => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="last_name">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" defaultValue={old_last_name} onChange= {(e) => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={old_phone_number} onChange= {(e) => setUserPhone(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </>
        )
    }

    // Restaurant Properties:
    const {old_restaurant_name, old_address1, old_city, old_state, old_restaurant_phone_number} = props;
    const[restaurant_name, setRestaurantName] = useState(old_restaurant_name);
    const[address1, setAddress1] = useState(old_address1);
    const[city, setCity] = useState(old_city);
    const[restaurant_state, setRestaurantState] = useState(old_state);
    const[restaurant_phone_number, setRestaurantPhone] = useState(old_restaurant_phone_number);

    // ready, just need back-end
    const handleRestaurantUpdate = (e) => {
        e.preventDefault();
        const updated_restaurant = {id, restaurant_name, address1, city, restaurant_state, restaurant_phone_number};

        console.log(JSON.stringify(updated_restaurant));

        // fetch(`http://localhost:5000/api/restaurant/${id}`, {
        //     method: 'PUT',
        //     headers: {"Content-type": "application/json" },
        //     body: JSON.stringify(updated_user)
        // }).then(() => {
        //     console.log("Done")
        // });
    }
    const RestaurantUpdateForm = () => {
        return (
            <>
                <h2 className="update-header">Make changes as necessary.</h2>
                <Form onSubmit={handleRestaurantUpdate}>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="restaurant_name">
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control type="text" defaultValue={old_restaurant_name} onChange= {(e) => setRestaurantName(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="address1">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" defaultValue={old_address1} onChange= {(e) => setAddress1(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" defaultValue={old_city} onChange= {(e) => setCity(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" defaultValue={old_state} onChange= {(e) => setRestaurantState(e.target.value)} />
                        </Form.Group>
                        <Form.Group as={Col} controlId="restaurant_phone_number">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="text" defaultValue={old_restaurant_phone_number} onChange= {(e) => setRestaurantPhone(e.target.value)} />
                        </Form.Group>
                    </Row>

                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </>
        )
    }

    return (
        <>
            {choice === "Restaurants" ? RestaurantUpdateForm() : UserUpdateForm()}
        </>
    );
};

export default AdminUpdate;