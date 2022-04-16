import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {MDBIcon} from "mdb-react-ui-kit";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservedTable from "../components/ReservedTable";
import '../css/UserHome.css';

const UserHome = () => {

    return (
        <>
            <NavigationBar />
            <form>
            <div className={"mainArea vh-100"}>
                <div className={"tableArea"}>
                    <table className={"table table-dark"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>ID</th>
                            <th scope={"col"}>Restaurant</th>
                            <th scope={"col"}>Day</th>
                            <th scope={"col"}>Time</th>
                            <th scope={"col"}>seats</th>
                            <th scope={"col"}>cancel</th>
                        </tr>
                        </thead>
                        <tbody>
                        <ReservedTable/>
                        </tbody>
                    </table>
                </div>
            </div>
            </form>
            <Footer/>
        </>
    )
};

export default UserHome;