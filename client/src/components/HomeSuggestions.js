import React from "react";
import {Button, Card, CardGroup, Carousel, Container} from "react-bootstrap";
import ShowMore from "./ShowMore";
import {useNavigate} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/HomeSuggestions.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';

const HomeSuggestions = () => {
    let navigate = useNavigate();

    function routeRestaurant() {
        navigate('/SomonaukCountryKitchen');
    }

    return (
        <>
            {/* Container for Cards */}
            <Container>
                <h2>Featured Restaurants</h2>
                <CardGroup>
                    {Array.from({ length: 4 }).map((_) => (
                        <Card className="restaurant-cards">
                            <Card.Img variant="top" className="restaurant-cards-img" src={dummy_image} />
                            <Card.Body className="card-body-home">
                                <Card.Title className="card-title-home">Restaurant Name</Card.Title>
                                <Card.Subtitle className="card-subtitle-home">City, State</Card.Subtitle>
                                <Card.Text className="card-text-home">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est iure, minima nam recusandae repellat voluptatem.
                                </Card.Text>
                                <Button className="cards-button" onClick={routeRestaurant}>Reserve Now</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </CardGroup>
            </Container>
            <ShowMore />
        </>
    )
};

export default HomeSuggestions;