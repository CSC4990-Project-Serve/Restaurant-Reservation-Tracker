import {useState} from "react";
import ReactDOM from 'react-dom'
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import AdminTable from '../components/AdminTable';
import {Container} from "react-bootstrap";
import '../css/AdminPage.css';


const AdminPage = () => {
    const[category, setCategory] = useState("Restaurants");

    function getCategory(event) {
        setCategory(event.target.value);
    }

    let restaurant_route = "http://localhost:5000/api/restaurant/";
    let user_route = "http://localhost:5000/api/users/";

    const requestOne = axios.get(restaurant_route);
    const requestTwo = axios.get(user_route);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        ReactDOM.render
        (
            <AdminTable restaurant_data={responseOne} user_data={responseTwo} choice={category} />,
            document.getElementById('table-data')
        );
    })).catch(errors => {
        console.log(errors);
    })

    return  (
        <>
            <NavigationBar/>

            <Container className="admin-page-container">
                <form>
                    <h2>Choose between restaurants and users</h2>
                    <select name="category" onChange={getCategory}>
                        <option value="Restaurants">Restaurants</option>
                        <option value="Users">Users</option>
                    </select>
                </form>

                <div id="table-data">
                    {/* Data goes here */}
                </div>
            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;