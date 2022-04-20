import {useState} from "react";
import axios from "axios";

import ReactDOM from 'react-dom'
import useFetch from "../useFetch";
import {Container} from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import TableData from '../components/TableData';
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/AdminPage.css';


const AdminPage = () => {
    const {data, isPending, error} = useFetch('http://localhost:5000/api/restaurant/')

    //Not working when i use a name other than data
    // const {user_data} = useFetch('http://localhost:5000/api/users/')
    const[restaurantToggle, setRestaurantToggle] = useState(true)

    function toggleRestaurant() {
        setRestaurantToggle(!restaurantToggle);
    }

    let restaurant_route = "http://localhost:5000/api/restaurant/";
    let user_route = "http://localhost:5000/api/restaurant/";

    const requestOne = axios.get(restaurant_route);
    const requestTwo = axios.get(user_route);

    axios.all([requestOne, requestTwo]).then(axios.spread((...responses) => {
        const responseOne = responses[0];
        const responseTwo = responses[1];
        console.log(responseOne, responseTwo);
    })).catch(errors => {
        console.log(errors);
    })

    // Promise.all([
    //     useFetch('http://localhost:5000/api/restaurant/'),
    //     useFetch('http://localhost:5000/api/users/')
    // ]).then(([restaurant_data, user_data]) => {
    //     ReactDOM.render(
    //         <TableData restaurant_data={restaurant_data} user_data={user_data} />,
    //         document.getElementById('table-data')
    //     );
    //     console.log("RESTAURANT" + restaurant_data)
    //     console.log("USER" + user_data)
    // }).catch((err) => {
    //     console.log(err);
    // });



    return  (
        <>
            <NavigationBar/>

            <Container className="admin-page-container">

                <form>
                    <h2>Choose between restaurants and users</h2>
                    <select name="category" onChange={toggleRestaurant}>
                        <option value="Restaurants">Restaurants</option>
                        <option value="Users">Users</option>
                    </select>
                </form>

                {/*{error}<div>{error}</div>*/}
                {/*{isPending && <div>Loading...</div>}*/}

                <table className="admin-page-table">
                    <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                    </tr>
                    </thead>
                    <tbody id="table-data">
                        {/*{restaurantToggle*/}
                        {/*    ?  restaurant_data && <TableData inventory={restaurant_data} />*/}
                        {/*    :  user_data && <TableData inventory={user_data} />*/}
                        {/*}*/}

                        { data && <TableData inventory={data}  />}
                    </tbody>
                </table>

            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;