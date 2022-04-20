import {Link, useLocation} from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {Card, Col, Container, Row} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/SearchPage.css';
import dummy_image from '../imgs/dummy-restaurant.jpg';


const SearchPage = () => {

    const location = useLocation();
    const {userSearchTerm} = location.state;

    return (
        <>
            <NavigationBar/>

            <div className="search-container">
                <div className="search-together">
                    <input type="search" className="search-bar" placeholder="Location, Restaurant, or Cuisine"/>
                    <button type="button" className="search-icon">
                        Search
                    </button>
                </div>
            </div>

            <Container>
                <h2><strong>Results For:</strong> {userSearchTerm}</h2>
            </Container>

            <Container>
                {/*TODO: Fix routing for all rendering... needs to match actual back-end*/}
                {Array.from({length: 4}).map((_, index) => (
                    <Link to="/search/1" style={{textDecoration: 'none'}} key={index}>
                        <Card type="button" className="card-container">
                            <Row>
                                <Col md={4}>
                                    <Card.Img variant="top" src={dummy_image}/>
                                </Col>
                                <Col md={8}>
                                    <Card.Body className="card-body-search">
                                        <Card.Title className="card-title-search">Restaurant Name</Card.Title>
                                        <Card.Subtitle className="card-subtitle-search">City, State</Card.Subtitle>
                                        <Card.Text className="card-text-icons">
                                            <MDBIcon fas icon="star"/>
                                            <MDBIcon fas icon="star"/>
                                            <MDBIcon fas icon="star"/>
                                            <MDBIcon fas icon="star"/>
                                            <MDBIcon far icon="star"/>
                                        </Card.Text>
                                        <Card.Text className="card-text-search">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
                                            blanditiis doloremque eaque enim eos eveniet fugiat illum incidunt iusto,
                                            maiores molestiae nulla odit sunt suscipit tempora temporibus totam ullam
                                            unde veniam vero! Accusamus architecto eveniet, ipsam laboriosam molestias
                                            necessitatibus odit perferendis quod rem veritatis. Ea?
                                        </Card.Text>
                                        <Card.Text>

                                        </Card.Text>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Link>
                ))}
            </Container>
            <Footer/>
        </>
    )
};

export default SearchPage;