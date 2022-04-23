import {useState} from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import AdminTable from '../components/AdminTable';
import {Container, Tab, Tabs} from "react-bootstrap";
import '../css/AdminPage.css';


//TODO: Create, Delete, Update Restaurants
//TODO: Create, Delete, Update Users
//TODO: Get all reservations for specific restaurant?
//TODO: Separate user page

const AdminPage = (props) => {
    const {restaurant_data, user_data} = props;
    const[category, setCategory] = useState("Restaurants");

    function getCategory(event) {
        setCategory(event.target.value);
    }

    return  (
        <>
            <NavigationBar/>

            <Container className="admin-page-container">


                <Tabs>
                    <Tab eventKey="data" title="All Data" >
                        <div className="inner-container">
                            <form>
                                <h2>Choose between restaurants and users</h2>
                                <select name="category" onChange={getCategory}>
                                    <option value="Restaurants">Restaurants</option>
                                    <option value="Users">Users</option>
                                </select>
                            </form>
                            <div id="table-data">
                                <AdminTable restaurant_data={restaurant_data} user_data={user_data} choice={category}/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="create" title="Register" >

                    </Tab>
                </Tabs>


            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;