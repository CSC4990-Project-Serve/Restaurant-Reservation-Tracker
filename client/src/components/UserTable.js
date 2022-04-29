import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserContext} from "../context/UserContext";

const UserTable = () => {
    const {userProfileData} = useContext(UserContext);

    const [userInformation, setUserInformation] = useState({
        id: userProfileData.user.id,
        username: userProfileData.user.username,
        email_address: userProfileData.user.email_address,
        first_name: userProfileData.user.first_name,
        last_name: userProfileData.user.last_name,
        phone_number: userProfileData.user.phone_number,
        reservations: []
    });
    const [userReservations, setUserReservations] = useState([{}]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                let restaurant_route = `${process.env.REACT_APP_API_URL}/api/users/${id}?reservations=1`;
                await axios.get(restaurant_route)
                    .then(response => {
                        // console.log(response.data);
                        setUserInformation(response.data);
                    });

            } catch (err) {
                console.log(err)
            }
        }

        fetchData(userProfileData.user.id);
    }, [])

    useEffect(() => {
        setUserReservations(userInformation.reservations);
    }, [userInformation])

    const ReservationData = userReservations.map(row => {
        return (
            <tr key={row.reservation_id}>
                <td>{row.restaurant_name}</td>
                <td>{new Date(row.reservation_date).toLocaleDateString()}</td>
                <td>{row.reservation_time}</td>
                <td>{row.purpose}</td>
                <td>{row.reservation_status === 1 ? "Confirmed" : "Unconfirmed"}</td>
                <td className="td-button">
                    <button key={row.reservation_id} type="button" className="btn btn-danger" onClick={() => handleReservationDelete(row.reservation_id)}>Cancel</button>
                </td>
            </tr>
        )
    })

    const handleReservationDelete = (reservation_id) => {
        fetch(`${process.env.REACT_APP_API_URL}/api/reservations/${reservation_id}`, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });
    }

    return (
        <>
            <h2>Please confirm reservations.</h2>

            <table className="user-page-table">
                <thead>
                <tr>
                    <th scope="col">Restaurant</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col">Purpose</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {ReservationData}
                </tbody>
            </table>
        </>

    );
}

export default UserTable;