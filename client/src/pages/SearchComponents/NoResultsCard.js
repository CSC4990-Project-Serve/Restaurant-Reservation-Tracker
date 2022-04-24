import React from 'react';
import {Card, Col, Row} from "react-bootstrap";
import {MDBCardBody, MDBCardText, MDBCardTitle} from "mdb-react-ui-kit";

function NoResultsCard(props) {
    return (
        <Card className={"card-container"}>
            <MDBCardBody>
                <MDBCardTitle>No Results</MDBCardTitle>
                <MDBCardText>No results found for your search term :(</MDBCardText>
            </MDBCardBody>
        </Card>
    );
}

export default NoResultsCard;