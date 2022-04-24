import React, {useContext, useEffect, useState} from 'react';
import parse from "html-react-parser";
import axios from "axios";
import {useSetState} from "react-use";

const ReservedTable = () => {

    const [userInformation, setUserInformation] = useState({
        id: null,
        username: "",
        email_address: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        reservations: []
    });
    const [userReservations, setUserReservations] = useState([{}]);

    useEffect(() => {
        const fetchData = async (id) => {
            try {
                let restaurant_route = `http://localhost:5000/api/users/${id}?reservations=1`;
                await axios.get(restaurant_route)
                    .then(response => {
                        // console.log(response.data);
                        setUserInformation(response.data);
                    });

            } catch (err) {
                console.log(err)
            }
        }

        fetchData(1);
    }, [])


    useEffect(() => {
        setUserReservations(userInformation.reservations);
    }, [userInformation])


    const IndividualReservation = ({reservationData}) => {
        return (
            <tr>
                <td>{reservationData.reservation_id}</td>
                <td>{reservationData.restaurant_name}</td>
                <td>{new Date(reservationData.reservation_date).toLocaleDateString()}</td>
                <td>{reservationData.reservation_time}</td>
                <td>{reservationData.purpose}</td>
                <td>{reservationData.reservation_status === 1 ? "Confirmed" : "Unconfirmed"}</td>
            </tr>
        )
    }

    return (
        <>
            {userReservations.map((reservation, index) => {
                return <IndividualReservation reservationData={reservation} key={index}/>
            })}
        </>

    );
}

export default ReservedTable;