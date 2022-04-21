import {Button, Card, CardGroup, Container} from "react-bootstrap";
import ShowMore from "./ShowMore";
import '../css/HomeSuggestions.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';
import axios from "axios";
import ReactDOM from "react-dom";
import AdminTable from "./AdminTable";
import {useEffect, useState} from "react";

//TODO: get ID of individual card and have button navigate to individual restaurant page from click of button

const HomeSuggestions = () => {
    const[restaurant_data, setRestaurantData] = useState([]);

    let restaurant_route = "http://localhost:5000/api/restaurant/";

    useEffect(() => {
        axios.get(restaurant_route)
            .then(response => setRestaurantData(response.data));
    }, []);

    console.log(restaurant_data)

    const HomeCards = restaurant_data.map(row => {
        return (
            <Card className="restaurant-cards" key={row.id}>
                <Card.Img variant="top" className="restaurant-cards-img" src={dummy_image}/>
                <Card.Body className="card-body-home">
                    <Card.Title className="card-title-home">{row.restaurant_name}</Card.Title>
                    <Card.Subtitle className="card-subtitle-home">{row.location.city}, {row.location.state}</Card.Subtitle>
                    <Card.Text className="card-text-home">
                        {row.restaurant_description}
                    </Card.Text>
                    <Button className="cards-button">Reserve Now</Button>
                </Card.Body>
            </Card>
        )
    })


    return (
        <>
            {/* Container for Cards */}
            <Container>
                <h2>Featured Restaurants</h2>
                <CardGroup>

                    {HomeCards}

                </CardGroup>
            </Container>

            <ShowMore/>
        </>
    )
};

export default HomeSuggestions;