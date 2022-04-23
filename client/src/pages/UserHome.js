import React, {useContext} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {MDBIcon} from "mdb-react-ui-kit";
import NavigationBar from "../components/Navbar";
import Footer from "../components/Footer";
import ReservedTable from "../components/ReservedTable";
import '../css/UserHome.css';
import $ from "jquery";
const axios = require("axios");

const UserHome = () => {
    const navigate = useNavigate();

    function deleteReservation(){
        var id = 2;
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Delete reservation id: " + id)){
            axios.delete("http://localhost:5000/api/restaurant/:" + id.toString(), {
                headers: {
                    "access-control-allow-origin": "*",
                }
            })
                .then(id => alert("reservation " + id + " deleted"))
                .catch(err => console.warn(err));

            navigate("/");
        }else{
            console.log('did not reservation');
            return false;
        }
    }

    return (
        <>
            <NavigationBar />
            <form onSubmit={deleteReservation}>
            <div className={"mainArea vh-100"}>
                <div className={"tableArea"}>
                    <table className={"table table-dark"}>
                        <thead>
                        <tr>
                            <th scope={"col"}>ID</th>
                            <th scope={"col"}>Restaurant</th>
                            <th scope={"col"}>Day</th>
                            <th scope={"col"}>Time</th>
                            <th scope={"col"}>purpose</th>
                            <th scope={"col"}>status</th>
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