import {useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import {Container} from "react-bootstrap";
import '../css/SearchPage.css';
import SearchCards from "./SearchComponents/SearchCards";

const SearchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [userSearchTerm, setUserSearchTerm] = useState(location.state);
    const [restaurantResults, setRestaurantResults] = useState([{restaurant_name: "", restaurant_description: "", location: {city: "", state: ""}}]);

    let api_route = `http://localhost:5000/api/search/${userSearchTerm}`;
    useEffect(() => {
        axios.get(api_route)
            .then(response => {
                setRestaurantResults(response.data);
            })
    }, [userSearchTerm])

    console.log(restaurantResults)

    // update the userSearchTerm state with the value within the search box on button click
    const searchForm = useRef(null); // used for search bar form
    const updateSearchTerm = (event) => {
        event.preventDefault();
        const form = searchForm.current;

        setUserSearchTerm(form['searchInput'].value);
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
                {restaurantResults.map((row, index) => {
                    return <SearchCards restaurant_data={row} key={index}/>
                })}

            </Container>
            <Footer/>
        </>
    )
};

export default SearchPage;