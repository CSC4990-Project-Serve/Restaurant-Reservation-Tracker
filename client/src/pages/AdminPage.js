import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import AdminTable from '../components/AdminTable';
import AdminCreate from '../components/AdminCreate';
import {Container,  Tab, Tabs} from "react-bootstrap";
import '../css/AdminPage.css';

const AdminPage = (props) => {
    const {restaurant_data, user_data} = props;

    return  (
        <>
            <NavigationBar/>

            <Container className="admin-page-container">
                <Tabs>
                    <Tab eventKey="data" title="All Data" >
                        <div className="all-data-container">

                            <div id="table-data">
                                <AdminTable restaurant_data={restaurant_data} user_data={user_data}/>
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="create" title="Register" >
                        <div className="create-container">
                            <div id="table-data">
                                <AdminCreate />
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