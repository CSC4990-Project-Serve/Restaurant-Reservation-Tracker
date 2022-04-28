import {useContext, useRef} from "react";
import {useNavigate} from "react-router-dom";
import HomeSuggestions from "../components/HomeSuggestions";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import HorizontalLine from "../components/HorizontalLine";
import {Carousel, Container} from "react-bootstrap";
import {MDBIcon} from "mdb-react-ui-kit";
import '../css/HomePage.css';
import carousel01 from '../imgs/carousel-overhead.jpg';
import carousel02 from '../imgs/carousel-outdoor.jpg';
import {UserContext} from "../context/UserContext";
// import carousel03 from '../imgs/carousel-indoor.jpg';
// import carousel04 from '../imgs/carousel-food.jpg';
// import carousel05 from '../imgs/carousel-eating.jpg';

const HomePage = (props) => {

    //test context for user
    const {userProfileData, setUserProfileData} = useContext(UserContext);
    // console.log(`IN HOME: UserState from context ${JSON.stringify(userProfileData)}`)

    const {restaurant_data} = props;

    const searchBox = useRef(null);

    let navigate = useNavigate();

    const handleSearchTermChange = (event) => {
        event.preventDefault();
        const form = searchBox.current;

        let searchTerm = form['searchVal'].value || "";

        navigate('/search', {state: searchTerm})
    };


    return (
        <>
            <NavigationBar/>

            {/* Container for Carousel Images */}
            <Container className="home-page-container">
                <Carousel>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img-home"
                            src={carousel01}
                            alt="Overhead of Restaurant"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img-home"
                            src={carousel02}
                            alt="Two people dining outside."
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img-home"
                            src={carousel02}
                            alt="Indoor Dining"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img-home"
                            src={carousel02}
                            alt="Food from a Restaurant"
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <img
                            className="carousel-img-home"
                            src={carousel02}
                            alt="Woman eating food"
                        />
                    </Carousel.Item>
                </Carousel>

                {/* Search Button in Carousel */}
                <div className="carousel-search-section">
                    <div className="carousel-header">Find a meal for every occasion.</div>
                    <form ref={searchBox}>
                        <input type="text" className="search-bar-carousel"
                               placeholder="Location, Restaurant, or Cuisine"
                               name={"searchVal"}
                        />
                        <button type="submit" className="search-icon-carousel" onClick={handleSearchTermChange}>
                            <MDBIcon fas icon="search"/>
                        </button>
                    </form>
                </div>
            </Container>

            <HorizontalLine/>

            {/* Container for Cards */}
            <HomeSuggestions restaurant_data={restaurant_data}/>

            <Footer/>
        </>
    )
};

export default HomePage;