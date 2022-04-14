import React, {useContext} from 'react';
import {AuthContext} from "../Context/Auth.Context";

const ReservedTable = () => {
    const {State} = useContext(AuthContext);
    //ToDo: read in current user's reservations and output them to a table body component
    return(
        <tr>
            <td>a name</td>
            <td>a day</td>
            <td>a time</td>
            <td>a location</td>
            <td>a seat</td>
            <td><button type={"submit"} class="btn btn-primary">Cancel</button></td>
        </tr>
    );

}

export default ReservedTable;