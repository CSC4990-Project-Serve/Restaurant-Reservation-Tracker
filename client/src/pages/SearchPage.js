import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {Container} from "react-bootstrap";
import '../css/SearchPage.css';
import SearchCards from "./SearchComponents/SearchCards";
import NoResultsCard from "./SearchComponents/NoResultsCard";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [userSearchTerm, setUserSearchTerm] = useState(location.state || "");
    const [restaurantResults, setRestaurantResults] = useState([{
        restaurant_name: null, restaurant_description: null, location: {city: null, state: null}
    }]);

    let api_route = (userSearchTerm === "") ? `http://localhost:5000/api/restaurant` : `http://localhost:5000/api/search/${userSearchTerm}`;
    useEffect(() => {
        axios.get(api_route)
            .then(response => {
                setRestaurantResults(response.data);
            })
    }, [userSearchTerm])

    // update the userSearchTerm state with the value within the search box on button click
    const searchForm = useRef(null); // used for search bar form
    const updateSearchTerm = (event) => {
        event.preventDefault();
        const form = searchForm.current;

        setUserSearchTerm(form['searchInput'].value);
        // https://stackoverflow.com/questions/40099431/how-do-i-clear-location-state-in-react-router-on-page-reload
        navigate(location.pathname, {}); //clear the old search term from the home page
    }

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
                {restaurantResults.length > 0 ? restaurantResults.map((row, index) => {
                    return <SearchCards restaurant_data={row} key={index}/>
                }) : <NoResultsCard/>}

            </Container>

            <Footer/>
        </>
    )
};

export default SearchPage;