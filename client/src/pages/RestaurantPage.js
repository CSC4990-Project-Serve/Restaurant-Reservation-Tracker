import {useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {UserContext} from "../context/UserContext";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import Modal from '../components/Modal';
import {Button,Carousel, Col, Container, Form, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/RestaurantPage.css';
import carousel01 from '../imgs/carousel-outdoor2.jpg';
import carousel02 from '../imgs/carousel-indoor.jpg';
import carousel03 from '../imgs/carousel-indoor2.jpg';


const RestaurantPage = () => {
    const{id} = useParams();
    let navigate = useNavigate();
    const[modal,setModal] = useState(false);
    const[restaurant_data, setRestaurantData] = useState({ name: "", description: "", phone: "", address: "", city: "", state: "", postal_code: "", mon: "", tue: "", wed: "", thu: "", fri: "", sat: "", sun: "" });

    //test context for user
    const {userProfileData} = useContext(UserContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let restaurant_route = `${process.env.REACT_APP_API_URL}/api/restaurant/${id}` ;
                await axios.get(restaurant_route)
                    .then(response => setRestaurantData({ name: response.data.restaurant_name, description: response.data.restaurant_description, phone: response.data.restaurant_phone_number, address: response.data.location.address1, city: response.data.location.city, state: response.data.location.state, postal_code: response.data.location.postal_code, mon: response.data.hours.monday, tue: response.data.hours.tuesday,wed: response.data.hours.wednesday, thu: response.data.hours.thursday, fri: response.data.hours.friday, sat: response.data.hours.saturday, sun: response.data.hours.sunday }));

            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, []);

    const restaurantID = id;
    const userID = userProfileData.user.id;
    const email_address = useState(userProfileData.user.email_address);
    const phone_number = useState(userProfileData.user.phone_number);
    const[first_name, setFirstName] = useState("John");
    const[last_name, setLastName] = useState("Doe");
    const[purpose, setPurpose] = useState("");
    const[party_size, setPartySize] = useState(1);
    const[reservation_date, setReservationDate] = useState("2022-01-01");
    let [reservation_time, setReservationTime] = useState("12:00:00");
    const reservation_status = 0;

    const handleReservation = (e) => {
        e.preventDefault();

        if(userProfileData.loggedIn) {
            reservation_time = reservation_time + ":00";
            const new_reservation = {userID, restaurantID, first_name, last_name, email_address, phone_number, reservation_date, reservation_time, purpose, party_size, reservation_status};

            fetch(`${process.env.REACT_APP_API_URL}/api/reservations`, {
                method: 'POST',
                headers: {"Content-type": "application/json" },
                body: JSON.stringify(new_reservation)
            }).then(() => {
                console.log("Done")
            });

            setModal(true)
        } else {
            alert("You are not logged in.");
            navigate("/login");
        }
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
                                    src={carousel01}
                                    alt="Overhead of Restaurant"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="carousel-img"
                                    src={carousel02}
                                    alt="Overhead of Restaurant"
                                />
                            </Carousel.Item>
                            <Carousel.Item interval={5000}>
                                <img
                                    className="carousel-img"
                                    src={carousel03}
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
                                        <Form.Control type="number" placeholder="Party size" onChange= {(e) => setPartySize(parseInt(e.target.value))} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="text" placeholder="Occasion (optional)" onChange= {(e) => setPurpose(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col className="mb-3">
                                        <Form.Control type="date" placeholder="Date" onChange= {(e) => setReservationDate(e.target.value)} />
                                    </Col>
                                    <Col>
                                        <Form.Control type="time" onChange= {(e) => setReservationTime(e.target.value)} />
                                    </Col>
                                </Row>
                                <Row >
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