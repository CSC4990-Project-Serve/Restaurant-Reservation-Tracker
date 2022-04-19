import {Container} from "react-bootstrap";
import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import '../css/AdminPage.css';

const AdminPage = () => {

    return (
        <>
            <NavigationBar/>

            <Container className="admin-page-container">

                <form>
                    <h2>Choose between restaurants and users</h2>
                    <select name="category">
                        <option value="restaurants">Restaurants</option>
                        <option value="users">Users</option>
                    </select>
                </form>

            </Container>

            <Footer/>
        </>
    )
};

export default AdminPage;