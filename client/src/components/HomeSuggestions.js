import {Button, Card, CardGroup, Container} from "react-bootstrap";
import ShowMore from "./ShowMore";
import '../css/HomeSuggestions.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';


const HomeSuggestions = () => {

    //TODO: get ID of individual card and have button navigate to individual restaurant page from click of button
    //TODO: get search term from home page and search page re-search and display in "Results for" header

    return (
        <>
            {/* Container for Cards */}
            <Container>
                <h2>Featured Restaurants</h2>
                <CardGroup>
                    {Array.from({length: 4}).map((_, index) => (
                        <Card className="restaurant-cards" key={index}>
                            <Card.Img variant="top" className="restaurant-cards-img" src={dummy_image}/>
                            <Card.Body className="card-body-home">
                                <Card.Title className="card-title-home">Restaurant Name</Card.Title>
                                <Card.Subtitle className="card-subtitle-home">City, State</Card.Subtitle>
                                <Card.Text className="card-text-home">
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est iure, minima nam
                                    recusandae repellat voluptatem.
                                </Card.Text>
                                <Button className="cards-button">Reserve Now</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </CardGroup>
            </Container>

            <ShowMore/>
        </>
    )
};

export default HomeSuggestions;