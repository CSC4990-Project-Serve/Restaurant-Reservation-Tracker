import {useState} from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import AdminTable from '../components/AdminTable';
import AdminCreate from '../components/AdminCreate';
import {Container, Form, Tab, Tabs} from "react-bootstrap";
import '../css/AdminPage.css';


//TODO: Delete, Update Restaurants
//TODO: Create, Update Users

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
                        <div className="all-data-container">
                            <form>
                                <h2>Choose between restaurants and users</h2>
                                <Form.Select name="category" onChange={getCategory}>
                                    <option value="Restaurants">Restaurants</option>
                                    <option value="Users">Users</option>
                                </Form.Select>

                            </form>
                            <div id="table-data">
                                <AdminTable restaurant_data={restaurant_data} user_data={user_data} choice={category}/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="create" title="Register" >
                        <div className="create-container">
                            <form>
                                <h2>Register restaurant or user?</h2>
                                <Form.Select className="category-select" name="category" onChange={getCategory}>
                                    <option value="Restaurants">Restaurants</option>
                                    <option value="Users">Users</option>
                                </Form.Select>
                            </form>
                            <div id="table-data">
                                <AdminCreate restaurant_data={restaurant_data} user_data={user_data} choice={category}/>
                            </div>
                        </div>
                    </Tab>
                </Tabs>


            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;