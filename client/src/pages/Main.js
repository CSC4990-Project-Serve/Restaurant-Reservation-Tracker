import React from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {Carousel, Container} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import HomeSuggestions from "../components/HomeSuggestions";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import HorizontalLine from "../components/HorizontalLine";
// import "@fortawesme/fontawesome-free/css/all.min.css";
import '../css/HomePage.css';
import carousel01 from '../imgs/carousel-overhead.jpg';
import carousel02 from '../imgs/carousel-outdoor.jpg';
import carousel03 from '../imgs/carousel-indoor.jpg';
import carousel04 from '../imgs/carousel-food.jpg';
import carousel05 from '../imgs/carousel-eating.jpg';

const Main = () => {
    let navigate = useNavigate();
    const routeChange = () => {
        let path = "/search";
        navigate(path);
    }

    return (
        <>
            <NavigationBar />

            {/* Container for Carousel Images */}
            <Container>
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src={carousel02}
                            height="650"
                            alt="Overhead of Restaurant"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src={carousel02}
                            height="650"
                            alt="Two people dining outside."
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src={carousel02}
                            height="650"
                            alt="Indoor Dining"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src={carousel02}
                            height="650"
                            alt="Food from a Restaurant"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="d-block w-100"
                            src={carousel02}
                            height="650"
                            alt="Woman eating food"
                        />
                    </Carousel.Item>
                </Carousel>

                {/* Search Button in Carousel */}
                <div className="carousel-search-section">
                    <div className="carousel-header">Find a meal for every occasion.</div>
                    <input type="search" className="search-bar-carousel" placeholder="Location, Restaurant, or Cuisine"/>
                    <button type="button" className="search-icon-carousel" onClick={routeChange}>
                        <MDBIcon fas icon="search" />
                    </button>
                </div>
            </Container>

            <HorizontalLine />

            {/* Container for Cards */}
            {Array.from({ length: 2 }).map((_) => (
                <HomeSuggestions />
            ))}

            <Footer/>
        </>
    )
};

export default Main;