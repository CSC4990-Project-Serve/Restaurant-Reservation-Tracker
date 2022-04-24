import {Button, Col, Form, Row} from "react-bootstrap";
import {useState} from "react";


//TODO: Admin update working!!! Need to implement it for restaurant next
const AdminUpdate = (props) => {
    const {choice, update, id, old_username, old_email_address, old_first_name, old_last_name, old_phone_number} = props;
    const[username, setUsername] = useState(old_username);
    const[email_address, setEmail] = useState(old_email_address);
    const[first_name, setFirstName] = useState(old_first_name);
    const[last_name, setLastName] = useState(old_last_name);
    const[phone_number, setUserPhone] = useState(old_phone_number);

    console.log(`Update: ${update} \nID of choice: ${id} \nChoice: ${choice} \nUsername: ${old_username} \nEmail address: ${old_email_address} \nFirst name: ${old_first_name} \nLast name: ${old_last_name} \nPhone number: ${old_phone_number}`)

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
    );
};

export default AdminUpdate;