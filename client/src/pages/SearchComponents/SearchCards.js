import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import dummy_image from "../../imgs/dummy-restaurant.jpg";
import {MDBIcon} from "mdb-react-ui-kit";
import {Link} from "react-router-dom";

function SearchCards(props) {
    const {restaurant_data} = props;

    const UserRating = () => {
        if(restaurant_data.star_rating === 5) {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                </Card.Text>
            )
        } else if(restaurant_data.star_rating === 4) {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon far icon="star"/>
                </Card.Text>
            )
        } else if(restaurant_data.star_rating === 3) {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                </Card.Text>
            )
        } else if(restaurant_data.star_rating === 2) {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon fas icon="star"/>
                    <MDBIcon fas icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                </Card.Text>
            )
        } else if(restaurant_data.star_rating === 1) {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon fas icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                </Card.Text>
            )
        } else {
            return (
                <Card.Text className="card-text-icons">
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                    <MDBIcon far icon="star"/>
                </Card.Text>
            )
        }
    }

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
                            {UserRating()}
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