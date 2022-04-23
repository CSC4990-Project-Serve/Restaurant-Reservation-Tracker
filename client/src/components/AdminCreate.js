import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import '../css/AdminPage.css';

const AdminCreate = (props) => {
    const navigate = useNavigate();
    const {choice, restaurant_data, user_data} = props;
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
        console.log("Create")

        const new_restaurant = {restaurant_name, restaurant_phone_number, restaurant_description, address1, city, state, postal_code, hours_open, hours_close};

        console.log(JSON.stringify(new_restaurant));
        // const new_item = {category, id, item, description, count, cost};
        //
        // if(count > 0 && cost > 0) {
        //     fetch( "http://localhost:8000/inventory", {
        //         method: 'POST',
        //         headers: {"Content-type": "application/json" },
        //         body: JSON.stringify(new_item)
        //     }).then(() => {
        //         setIsPending(false);
        //         navigate('/inventory');
        //     });
        // } else {
        //     alert("Error, invalid input... try again.")
        //     setIsPending(false);
        // }
    }


    return (
        <>
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

            {/*<form onSubmit={handleSubmit}>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="category" className="form-label">Category</label>*/}
            {/*        <select className="form-select" name="category" required value={category} onChange= {(e) => setCategory(e.target.value)}>*/}
            {/*            <option value="Sprocket">Sprocket</option>*/}
            {/*            <option value="Cog">Cog</option>*/}
            {/*        </select>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="id" className="form-label">ID</label>*/}
            {/*        <input type="text" className="form-control" id="id" required value={id} onChange= {(e) => setID(e.target.value)}/>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="item" className="form-label">Item Name</label>*/}
            {/*        <input type="text" className="form-control" id="item" required value={item} onChange= {(e) => setItem(e.target.value)}/>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="description" className="form-label">Description</label>*/}
            {/*        <input type="text" className="form-control" id="description" required value={description} onChange= {(e) => setDescription(e.target.value)}/>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="count" className="form-label">Count</label>*/}
            {/*        <input type="number" className="form-control" id="count" required value={count} onChange= {(e) => setCount(e.target.valueAsNumber)}/>*/}
            {/*    </div>*/}
            {/*    <div className="mb-3">*/}
            {/*        <label htmlFor="cost" className="form-label">Cost</label>*/}
            {/*        <input type="number" step="0.01" className="form-control" id="cost" required value={cost} onChange= {(e) => setCost(e.target.valueAsNumber)}/>*/}
            {/*    </div>*/}

            {/*    <div className="button-container">*/}
            {/*        {!isPending && <button type="submit" className="btn btn-primary">Create</button>}*/}
            {/*        {isPending && <button type="submit" className="btn btn-primary">Creating...</button>}*/}
            {/*    </div>*/}

            {/*</form>*/}
        </>
    )
}

export default AdminCreate;