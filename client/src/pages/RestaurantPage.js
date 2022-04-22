import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Modal from '../components/Modal';
import {Button,Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/RestaurantPage.css';
import carousel_img from '../imgs/carousel-overhead.jpg';

const RestaurantPage = () => {
    const {id} = useParams();
    const[restaurant_data, setRestaurantData] = useState({ name: "", description: "", phone: "", address: "", city: "", state: "", postal_code: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "" });

    useEffect(() => {
        const fetchData = async () => {
            try {
                let restaurant_route = "http://localhost:5000/api/restaurant/" + id;
                await axios.get(restaurant_route)
                    .then(response => setRestaurantData({ name: response.data.restaurant_name, description: response.data.restaurant_description, phone: response.data.restaurant_phone_number, address: response.data.location.address1, city: response.data.location.city, state: response.data.location.state, postal_code: response.data.location.postal_code, mon: response.data.hours.monday, tue: response.data.hours.tuesday,wed: response.data.hours.wednesday, thu: response.data.hours.thursday, fri: response.data.hours.friday, sat: response.data.hours.saturday, sun: response.data.hours.sunday }));

            } catch (err) {
                console.log(err)
            }
        }
        fetchData();
    }, []);

    const [modal,setModal] = useState(false);

    const handleReservation = () => {
        //TODO: POST request
        setModal(true)
    }

    return (
        <>
            <NavigationBar />

            <Container className="restaurant-details-container">
                <Row>
                    <Col className="left-col-restaurant-details">
                        <h2 className="restaurant-details-heading">{restaurant_data.name}</h2>

                        <Carousel>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="carousel-img"
                                    src={carousel_img}
                                    alt="Overhead of Restaurant"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="carousel-img"
                                    src={carousel_img}
                                    alt="Overhead of Restaurant"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="carousel-img"
                                    src={carousel_img}
                                    alt="Overhead of Restaurant"
                                />
                            </Carousel.Item>
                        </Carousel>

                        <h2 className="restaurant-details-heading">About Us</h2>
                        <p>{restaurant_data.description}</p>
                    </Col>
                    <Col className="middle-col-restaurant-details">
                        <h2 className="restaurant-details-heading">Location</h2>
                        <p>{restaurant_data.address}, {restaurant_data.city}, {restaurant_data.state} {restaurant_data.postal_code}</p>

                        <h2 className="restaurant-details-heading">Hours of Operation</h2>
                        <p>Monday: {restaurant_data.mon}</p>
                        <p>Tuesday: {restaurant_data.tue}</p>
                        <p>Wednesday: {restaurant_data.wed}</p>
                        <p>Thursday: {restaurant_data.thu}</p>
                        <p>Friday: {restaurant_data.fri}</p>
                        <p>Saturday: {restaurant_data.sat}</p>
                        <p>Sunday: {restaurant_data.sun}</p>
                    </Col>
                    <Col className="right-col-restaurant-details">
                        <h2 className="restaurant-details-heading">Order now</h2>

                        {/*TODO: change format of time in database (varchar and HH:MM format)*/}
                        <p><MDBIcon fas icon="phone" className="phone-icon"/>&nbsp;&nbsp; {restaurant_data.phone}</p>

                        <div className="reservation-widget">
                            <h2 className="reservation-heading">Make a Reservation</h2>
                            <Form>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="text" placeholder="First name" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Last name" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="email" placeholder="Email" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="tel" placeholder="Phone number" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="number" placeholder="Party size" />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Occasion (optional)" />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="date" placeholder="Date" />
                                    </Col>
                                    <Col>
                                        <Form.Select>
                                            <option>Time</option>
                                            <option value="#">9:00 AM</option>
                                            <option value="#">9:30 AM</option>
                                            <option value="#">10:00 AM</option>
                                            <option value="#">10:30 AM</option>
                                            <option value="#">11:00 AM</option>
                                            <option value="#">11:30 AM</option>
                                            <option value="#">12:00 PM</option>
                                            <option value="#">12:30 PM</option>
                                            <option value="#">1:00 PM</option>
                                            <option value="#">1:30 PM</option>
                                            <option value="#">2:00 PM</option>
                                            <option value="#">2:30 PM</option>
                                            <option value="#">3:00 PM</option>
                                            <option value="#">3:30 PM</option>
                                            <option value="#">4:00 PM</option>
                                            <option value="#">4:30 PM</option>
                                            <option value="#">5:00 PM</option>
                                            <option value="#">5:30 PM</option>
                                            <option value="#">6:00 PM</option>
                                            <option value="#">6:30 PM</option>
                                            <option value="#">7:00 PM</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row>
                                    <Button className="reservation-button" type="button" onClick={handleReservation}>Complete Reservation</Button>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>

                <Modal show={modal} onHide={() => setModal(false)} />
            </Container>


            <Footer />
        </>
    )
};

export default RestaurantPage;