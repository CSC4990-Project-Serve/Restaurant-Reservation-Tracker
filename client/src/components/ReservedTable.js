import React, {useContext} from 'react';
import {AuthContext} from "../Context/Auth.Context";
import parse from "html-react-parser";

const ReservedTable = () => {
    const {State} = useContext(AuthContext);
    //ToDo: read in current user's reservations and output them to a table body component
    //ToDo: change hard coded info to database info
    const reservationInfo = [{
        reservationID : 1,
        restaurantName : "first breakfast",
        day : "11/11/22",
        time : "2:30",
        seats : 1
    },
        {
            reservationID : 2,
            restaurantName : "second breakfast",
            day : "11/22/22",
            time : "3:30",
            seats : 2
        }];
    function reservations(reservationInfo){
        let doc = "";
        for(let i = 0;i < reservationInfo.length;i++){
            doc += "<tr>";
            doc += "<td>" + reservationInfo[i].reservationID + "</td>";
            doc += "<td>" + reservationInfo[i].restaurantName + "</td>";
            doc += "<td>" + reservationInfo[i].day + "</td>";
            doc += "<td>" + reservationInfo[i].time + "</td>";
            doc += "<td>" + reservationInfo[i].seats + "</td>";
            doc += "</tr>";
        }
        return doc;
    }
    return(
        parse(reservations(reservationInfo))
    );
}

export default ReservedTable;