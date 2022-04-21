import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Button,Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import '../css/RestaurantPage.css';
import carousel_img from '../imgs/carousel-overhead.jpg';



const RestaurantPage = () => {
    const {id} = useParams();
    const[restaurant_data, setRestaurantData] = useState([]);

    let restaurant_route = "http://localhost:5000/api/restaurant/" + id;

    useEffect(() => {
        axios.get(restaurant_route)
            .then(response => setRestaurantData(response.data));
    }, []);

    // console.log(id)
    // console.log(restaurant_route)
    // console.log(restaurant_data)

    const LeftColumn = () => {
        return (
            <Col className="left-col-restaurant-details">
                <h2 className="restaurant-details-heading">{restaurant_data.restaurant_name}</h2>

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
                            alt="Overhead of Restaurant"                                />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img"
                            src={carousel_img}
                            alt="Overhead of Restaurant"                                />
                    </Carousel.Item>
                </Carousel>

                <h2 className="restaurant-details-heading">About Us</h2>
                <p>{restaurant_data.restaurant_description}</p>
            </Col>
        );
    }

    //BREAKING because we are going into the location object... i think
    const MiddleColumn = () => {
        return (
            <Col className="middle-col-restaurant-details">
                <h2 className="restaurant-details-heading">Location</h2>
                <p>{restaurant_data.location.address1}, {restaurant_data.location.city}, {restaurant_data.location.state} {restaurant_data.location.postal_code}</p>

                <h2 className="restaurant-details-heading">Hours of Operation</h2>
                <p>Monday: {restaurant_data.hours.monday}</p>
                <p>Tuesday: {restaurant_data.hours.tuesday}</p>
                <p>Wednesday: {restaurant_data.hours.wednesday}</p>
                <p>Thursday: {restaurant_data.hours.thursday}</p>
                <p>Friday: {restaurant_data.hours.friday}</p>
                <p>Saturday: {restaurant_data.hours.saturday}</p>
                <p>Sunday: {restaurant_data.hours.sunday}</p>
            </Col>
        );
    }
    const RightColumn = () => {
        return (
            <Col className="right-col-restaurant-details">
                <h2 className="restaurant-details-heading">Order now</h2>

                {/*TODO: change format of time in database (varchar and HH:MM format)*/}
                <p><MDBIcon fas icon="phone"/>&nbsp;&nbsp; {restaurant_data.restaurant_phone_number}</p>

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
                            <Button className="reservation-button" type="submit">Complete Reservation</Button>
                        </Row>
                    </Form>
                </div>
            </Col>
        );
    }

    const RestaurantDetails = () => {
        return (
            <Row>
                {LeftColumn()}

                {/*Split every individual column to see what was breaking the page*/}
                {/*TODO: figure out why middle column is breaking page*/}
                {/*{MiddleColumn()}*/}

                {RightColumn()}
            </Row>
        )
    }

    return (
        <>
            <NavigationBar />

            <Container className="restaurant-details-container">

                {RestaurantDetails()}

            </Container>


            <Footer />
        </>
    )
};

export default RestaurantPage;