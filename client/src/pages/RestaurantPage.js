import {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Modal from '../components/Modal';
import {Button,Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/RestaurantPage.css';
import carousel_img from '../imgs/carousel-overhead.jpg';
import {UserContext} from "../context/UserContext";

const RestaurantPage = () => {
    const{id} = useParams();
    const[modal,setModal] = useState(false);
    const[restaurant_data, setRestaurantData] = useState({ name: "", description: "", phone: "", address: "", city: "", state: "", postal_code: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "" });

    //test context for user
    const {userProfileData, setUserProfileData} = useContext(UserContext);
    console.log(`IN RESTAURANT PAGE: UserState from context ${JSON.stringify(userProfileData)}`)


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
        fetchData()
    }, []);


    const[restaurantID, setRestaurantID] = useState(id);
    const userID = 2; //grab from useContext when logged in... this for sure
    const[first_name, setFirstName] = useState("John");
    const[last_name, setLastName] = useState("Doe");
    const[email_address, setEmailAddress] = useState("project@serve.live"); //grab from useContext when logged in... this for sure
    const[phone_number, setPhoneNumber] = useState("123-456-7890"); //grab from useContext when logged in... this for sure
    const[reservation_date, setReservationDate] = useState("2022-01-01");
    let [reservation_time, setReservationTime] = useState("12:00:00");
    const[purpose, setPurpose] = useState("");
    const[party_size, setPartySize] = useState(1);
    const reservation_status = 0;

    const handleReservation = (e) => {
        e.preventDefault();

        reservation_time = reservation_time + ":00";

        const new_reservation = {userID, restaurantID, first_name, last_name, email_address, phone_number, reservation_date, reservation_time, purpose, party_size, reservation_status};

        console.log(JSON.stringify(new_reservation));

        fetch("http://localhost:5000/api/reservations", {
            method: 'POST',
            headers: {"Content-type": "application/json" },
            body: JSON.stringify(new_reservation)
        }).then(() => {
            console.log("Done")
        });

        setModal(true)
    }

    return (
        <>
            <NavigationBar />

            <Container className="restaurant-details-container">
                <Row className="vertical-center">
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

                        <p><MDBIcon fas icon="phone" className="phone-icon"/>&nbsp;&nbsp; {restaurant_data.phone}</p>

                        <div className="reservation-widget">
                            <h2 className="reservation-heading">Make a Reservation</h2>
                            <Form onSubmit={handleReservation}>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="text" placeholder="First name" onChange= {(e) => setFirstName(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Last name" onChange= {(e) => setLastName(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="email" placeholder="Email" onChange= {(e) => setEmailAddress(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="tel" placeholder="Phone number" onChange= {(e) => setPhoneNumber(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="number" placeholder="Party size" onChange= {(e) => setPartySize(parseInt(e.target.value))} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Occasion (optional)" onChange= {(e) => setPurpose(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Control type="date" placeholder="Date" onChange= {(e) => setReservationDate(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" onChange= {(e) => setReservationTime(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Button className="reservation-button" type="submit">Complete Reservation</Button>
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