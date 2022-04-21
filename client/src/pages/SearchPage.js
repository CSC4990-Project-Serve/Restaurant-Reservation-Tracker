import {Link, useLocation} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {Button, Card, Col, Container, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/SearchPage.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';
import {useEffect, useRef, useState} from "react";
import axios from "axios";


const SearchPage = () => {

    const location = useLocation();
    const [userSearchTerm, setUserSearchTerm] = useState(location.state);

    // used for search bar form
    const searchForm = useRef(null);

    // update the userSearchTerm state with the value within the search box on button click
    const updateSearchTerm = (event) => {
        event.preventDefault();
        const form = searchForm.current;

        setUserSearchTerm(form['searchInput'].value);
    }

    const[restaurant_data, setRestaurantData] = useState([]);

    let restaurant_route = "http://localhost:5000/api/restaurant/";

    useEffect(() => {
        axios.get(restaurant_route)
            .then(response => setRestaurantData(response.data));
    }, []);

    const SearchCards = restaurant_data.map(row => {

        return (
            <Card type="button" className="card-container" key={row.id}>
                <Row>
                    <Col md={4}>
                        <Card.Img variant="top" src={dummy_image}/>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="card-body-search">
                            <Card.Title className="card-title-search">{row.restaurant_name}</Card.Title>
                            <Card.Subtitle className="card-subtitle-search">{row.location.city}, {row.location.state}</Card.Subtitle>
                            <Card.Text className="card-text-icons">
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon far icon="star"/>
                            </Card.Text>
                            <Card.Text className="card-text-search">
                                {row.restaurant_description}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        )
    });


    return (
        <>
            <NavigationBar/>

            <div className="search-container">
                <div className="search-together">
                    <form ref={searchForm}>
                        <input type="search" className="search-bar" placeholder="Location, Restaurant, or Cuisine"
                               name={"searchInput"}/>
                        <button type="submit" className="search-icon" onClick={updateSearchTerm}>
                            Search
                        </button>
                    </form>
                </div>
            </div>

            <Container>
                <h2><strong>Results For:</strong> {userSearchTerm}</h2>
            </Container>

            <Container>
                {/*TODO: Fix routing for all rendering... needs to match actual back-end*/}
                {SearchCards}

                    {/*<Link to="/search/1" style={{textDecoration: 'none'}} key={index}>*/}
                    {/*</Link>*/}
            </Container>
            <Footer/>
        </>
    )
};

export default SearchPage;