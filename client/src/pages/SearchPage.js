import {useRef, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/SearchPage.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';

const SearchPage = (props) => {
    const {restaurant_data} = props;
    const location = useLocation();
    const navigate = useNavigate();

    const [userSearchTerm, setUserSearchTerm] = useState(location.state);

    // used for search bar form
    const searchForm = useRef(null);

    // update the userSearchTerm state with the value within the search box on button click
    const updateSearchTerm = (event) => {
        event.preventDefault();
        const form = searchForm.current;

        setUserSearchTerm(form['searchInput'].value);
        navigate(location.pathname, {}); //clear the old search term from the home page
    }

    const SearchCards = restaurant_data.map(row => {
        return (
            <Link to={`/search/${row.id}`} style={{textDecoration: 'none'}} key={row.id}>
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
            </Link>
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

            <Container className="search-results-container">
                <h2><strong>Results For:</strong> {userSearchTerm}</h2>
                {SearchCards}
            </Container>
            <Footer/>
        </>
    )
};

export default SearchPage;