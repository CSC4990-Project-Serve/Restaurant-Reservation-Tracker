import {Link} from "react-router-dom";
import ShowMore from "./ShowMore";
import {Button, Card, CardGroup, Container} from "react-bootstrap";
import '../css/HomeSuggestions.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';

const HomeSuggestions = (props) => {
    const {restaurant_data} = props;

    let randomNums = [];
    const numOfSuggestions = 4
    while (randomNums.length < numOfSuggestions) {
        if (numOfSuggestions > restaurant_data.length) {
            // console.log("ERROR: num of desired suggestions is greater than data available");
            break;
        }

        let randomNumber = Math.floor(Math.random() * restaurant_data.length + 1);
        if (!randomNums.some(num => num === randomNumber)) {
            randomNums.push(randomNumber);
        }
    }

    let randomNums2 = [];
    const numOfSuggestions2 = 4
    while (randomNums2.length < numOfSuggestions2) {
        if (numOfSuggestions2 > restaurant_data.length) {
            // console.log("ERROR: num of desired suggestions is greater than data available");
            break;
        }

        let randomNumber2 = Math.floor(Math.random() * restaurant_data.length + 1);
        if (!randomNums2.some(num => num === randomNumber2)) {
            randomNums2.push(randomNumber2);
        }
    }

    const FeaturedCards = restaurant_data.map(row => {
        for(let i = 0; i < randomNums.length; i++) {
            // console.log(randomNums[i])
            if(randomNums[i] === row.id) {
                return (
                    <Card className="restaurant-cards" key={row.id}>
                        <Card.Img variant="top" className="restaurant-cards-img" src={dummy_image}/>
                        <Card.Body className="card-body-home">
                            <Card.Title className="card-title-home">{row.restaurant_name}</Card.Title>
                            <Card.Subtitle className="card-subtitle-home">{row.location.city}, {row.location.state}</Card.Subtitle>
                            <Card.Text className="card-text-home">
                                {row.restaurant_description}
                            </Card.Text>
                            <Link to={`search/${row.id}`}>
                                <Button className="cards-button">Reserve Now</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                )
            }
        }
    });

    const RecommendedCards = restaurant_data.map(row => {
        for(let i = 0; i < randomNums2.length; i++) {
            // console.log(randomNums2[i])
            if(randomNums2[i] === row.id) {
                return (
                    <Card className="restaurant-cards" key={row.id}>
                        <Card.Img variant="top" className="restaurant-cards-img" src={dummy_image}/>
                        <Card.Body className="card-body-home">
                            <Card.Title className="card-title-home">{row.restaurant_name}</Card.Title>
                            <Card.Subtitle className="card-subtitle-home">{row.location.city}, {row.location.state}</Card.Subtitle>
                            <Card.Text className="card-text-home">
                                {row.restaurant_description}
                            </Card.Text>
                            <Link to={`search/${row.id}`}>
                                <Button className="cards-button">Reserve Now</Button>
                            </Link>
                        </Card.Body>
                    </Card>

                )
            }
        }
    })

    return (
        <>
            {/* Container for Cards */}
            <Container className="suggestions-container">
                <h2>Featured Restaurants</h2>
                <CardGroup className="suggestion-groups">
                    {FeaturedCards}
                </CardGroup>
                <ShowMore/>

                <h2>Recommended Restaurants</h2>
                <CardGroup className="suggestion-groups">
                    {RecommendedCards}
                </CardGroup>
                <ShowMore/>

            </Container>
        </>
    )
};

export default HomeSuggestions;