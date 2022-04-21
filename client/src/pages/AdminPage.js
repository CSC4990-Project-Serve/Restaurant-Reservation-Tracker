import {useState} from "react";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import AdminTable from '../components/AdminTable';
import {Container} from "react-bootstrap";
import '../css/AdminPage.css';


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
                <form>
                    <h2>Choose between restaurants and users</h2>
                    <select name="category" onChange={getCategory}>
                        <option value="Restaurants">Restaurants</option>
                        <option value="Users">Users</option>
                    </select>
                </form>

                <div id="table-data">
                    {/* Data goes here */}
                    <AdminTable restaurant_data={restaurant_data} user_data={user_data} choice={category}/>
                </div>
            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;