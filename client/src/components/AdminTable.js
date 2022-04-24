import {useState} from "react";
import AdminUpdate from "../components/AdminUpdate"

const AdminTable = (props) => {
    const {choice, restaurant_data, user_data} = props;

    const RestaurantHeading = () => {
        return (
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Address</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Phone Number</th>
            </tr>
        )
    }
    const UserHeading = () => {
        return (
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Phone Number</th>
            </tr>
        )
    }

    const RestaurantData = restaurant_data.map(row => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.restaurant_name}</td>
                <td>{row.location.address1}</td>
                <td>{row.location.city}</td>
                <td>{row.location.state}</td>
                <td>{row.restaurant_phone_number}</td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-success" onClick={(e) => handleRestaurantUpdate(row.id, e)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={(e) => handleRestaurantDelete(row.id, e)}>Delete</button>
                </td>
            </tr>
        )
    })
    const handleRestaurantDelete = (id, e) => {
        e.preventDefault();

        //TODO: need delete and update implemented in back end
        console.log("Deleting ID: " + id);

        // fetch( 'http://localhost:5000/api/restaurant/' + id, {
        //     method: 'DELETE',
        // }).then(() => {
        //     alert("Delete successful.");
        // });
    }
    const handleRestaurantUpdate = (id, e) => {
        console.log("Updating ID: " + id);
    }

    const[updateActive, setUpdateActive] = useState({ update: false, id: 0, username: "", email_address: "", first_name: "", last_name: "", phone_number: "" });

    const UserData = user_data.map(row => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.username}</td>
                <td>{row.email_address}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.phone_number}</td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-success" onClick={(e) => handleUserUpdate(row.id, row.username, row.email_address, row.first_name, row.last_name, row.phone_number, e)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={(e) => handleUserDelete(row.id)}>Delete</button>
                </td>
            </tr>
        )
    })
    const handleUserDelete = (id, e) => {
        e.preventDefault();

        fetch( 'http://localhost:5000/api/users/' + id, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
        });

    }
    const handleUserUpdate = (id, username, email_address, first_name, last_name, phone_number) => {
        // e.preventDefault();
        console.log("Updating ID: " + id);

       setUpdateActive({update: true, id: id, username: username, email_address: email_address, first_name: first_name, last_name: last_name, phone_number: phone_number});
    }

    return (
        <>
            <table className="admin-page-table">
                <thead>
                    {choice === "Restaurants" ? RestaurantHeading() : UserHeading()}
                </thead>
                <tbody>
                    {choice === "Restaurants" ? RestaurantData : UserData}
                </tbody>
            </table>

            <div className="update-container">
                {updateActive.update === true && <AdminUpdate  choice={choice} update={updateActive.update} id={updateActive.id} old_username={updateActive.username} old_email_address={updateActive.email_address} old_first_name={updateActive.first_name} old_last_name={updateActive.last_name} old_phone_number={updateActive.phone_number}/>}
            </div>
        </>
    )
}

export default AdminTable;