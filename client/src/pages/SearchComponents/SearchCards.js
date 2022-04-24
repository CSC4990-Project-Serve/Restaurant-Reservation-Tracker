import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import dummy_image from "../../imgs/dummy-restaurant.jpg";
import {MDBIcon} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

function SearchCards(props) {
    console.log(`recievedProps: ${JSON.stringify(props)}`)
    const {restaurant_data} = props;

    return (
        <Link to={`/search/${restaurant_data.id}`} style={{textDecoration: 'none'}} key={restaurant_data.id}>
            <Card type="button" className="card-container" key={restaurant_data.id}>
                <Row>
                    <Col md={4}>
                        <Card.Img variant="top" src={dummy_image}/>
                    </Col>
                    <Col md={8}>
                        <Card.Body className="card-body-search">
                            <Card.Title className="card-title-search">{restaurant_data.restaurant_name}</Card.Title>
                            <Card.Subtitle className="card-subtitle-search">{restaurant_data.location.city}, {restaurant_data.location.state}</Card.Subtitle>
                            <Card.Text className="card-text-icons">
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon fas icon="star"/>
                                <MDBIcon far icon="star"/>
                            </Card.Text>
                            <Card.Text className="card-text-search">
                                {restaurant_data.restaurant_description}
                            </Card.Text>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </Link>
    );
}

export default SearchCards;