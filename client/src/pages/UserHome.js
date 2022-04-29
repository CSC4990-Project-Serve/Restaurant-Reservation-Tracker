import NavigationBar from "../components/NavigationBar";
import Footer from "../components/Footer";
import UserTable from "../components/UserTable";
import UserInfo from "../components/UserInfo";
import {Button, Container, Tab, Tabs} from "react-bootstrap";
import '../css/UserHome.css';
import {useContext} from "react";
import {UserContext} from "../context/UserContext";



const UserHome = () => {

    const {userProfileData} = useContext(UserContext);
    const id = userProfileData.user.id

    const handleUserDelete = () => {

        // console.log("delete")

        // TODO: error im getting.. DELETE http://localhost:5000/api/users/3 500 (Internal Server Error)

        // fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        //     method: 'DELETE',
        // }).then(() => {
        //     alert("Delete successful.");
        //     window.location.reload();
        // });
    }

    return (
        <>
            <NavigationBar />

            <Container className="user-page-container">
                <Tabs>
                    <Tab eventKey="info" title="Account Info">
                        <UserInfo />
                    </Tab>
                    <Tab eventKey="change" title="Change password">

                    </Tab>
                    <Tab eventKey="delete" title="Deactivate ">
                        <div className="delete-account">
                            <p>Are you absolutely sure that you want to delete your account? Please note that there is no option to restore the account or its data nor reuse the username once it's deleted. If you click the button, your account will be deleted.</p>
                            <Button variant="danger" type="button" className="user-delete"  onClick= {() => handleUserDelete()}>Delete Account</Button>
                        </div>
                    </Tab>
                    <Tab eventKey="data" title="Reservations">
                        <div className="all-data-container">
                            <div id="table-data">
                                <UserTable />
                            </div>
                        </div>
                    </Tab>
                </Tabs>
            </Container>

            <Footer/>
        </>
    )
};

export default UserHome;