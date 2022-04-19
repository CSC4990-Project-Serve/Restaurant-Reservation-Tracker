import {Button, Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import '../css/RestaurantPage.css';
import carousel_img from '../imgs/carousel-overhead.jpg';


const RestaurantPage = () => {

    return (
        <>
            <NavigationBar />

            <Container className="restaurant-details-container">
                <Row>
                    <Col className="left-col-restaurant-details">
                        <h2 className="restaurant-details-heading">Restaurant Name</h2>

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
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi asperiores assumenda at autem commodi dolorem earum, est eum ex fuga incidunt libero, modi molestias mollitia nam neque nisi officiis omnis placeat quod sunt tempore vel. Ad dolor ducimus, eos error expedita id ipsum iure laudantium libero nihil nisi rem?</p>
                    </Col>

                    <Col className="middle-col-restaurant-details">
                        <h2 className="restaurant-details-heading">Location</h2>
                        <p>347 S Gladstone Ave, Aurora, IL 60506</p>

                        <h2 className="restaurant-details-heading">Hours of Operation</h2>
                        <p>Monday: 9:00-17:00</p>
                        <p>Tuesday: 9:00-17:00</p>
                        <p>Wednesday: 9:00-17:00</p>
                        <p>Thursday: 9:00-17:00</p>
                        <p>Friday: 9:00-17:00</p>
                        <p>Saturday: 9:00-17:00</p>
                        <p>Sunday: 9:00-17:00</p>
                    </Col>

                    <Col className="right-col-restaurant-details">
                        <h2 className="restaurant-details-heading">Order now</h2>

                        <p><MDBIcon fas icon="phone"/>&nbsp;&nbsp;(123) 456-7890</p>

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
                </Row>

            </Container>


            <Footer />
        </>
    )
};

export default RestaurantPage;