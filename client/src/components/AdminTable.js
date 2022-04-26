import {useState} from "react";
import AdminUpdate from "../components/AdminUpdate"
import {Form} from "react-bootstrap";

const AdminTable = (props) => {
    const {restaurant_data, user_data} = props;
    const[category, setCategory] = useState("Restaurants");
    const[updateActive, setUpdateActive] = useState({ update: false, id: 0, username: "", email_address: "", first_name: "", last_name: "", phone_number: "", restaurant_name: "",  address1: "", city: "", state: "", restaurant_phone_number: ""});

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
                    <button key={row.id} type="button" className="btn btn-success" onClick={(e) => handleRestaurantUpdate(row.id, row.restaurant_name, row.location.address1, row.location.city, row.location.state, row.restaurant_phone_number, e)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={(e) => handleRestaurantDelete(row.id, e)}>Delete</button>
                </td>
            </tr>
        )
    })
    //ready in the front-end
    const handleRestaurantDelete = (id) => {
        console.log("Deleting ID: " + id);

        // fetch( 'http://localhost:5000/api/restaurant/' + id, {
        //     method: 'DELETE',
        // }).then(() => {
        //     alert("Delete successful.");
        //     window.location.reload();
        // });
    }
    //ready in the front-end
    const handleRestaurantUpdate = (id, restaurant_name, address1, city, state, restaurant_phone_number) => {
        // e.preventDefault();
        console.log("Updating ID: " + id);
        setUpdateActive({update: true, id: id, restaurant_name: restaurant_name, address1: address1, city: city, state: state, restaurant_phone_number: restaurant_phone_number, username: "", email_address: "", first_name: "", last_name: "", phone_number: ""});
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
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => handleUserUpdate(row.id, row.username, row.email_address, row.first_name, row.last_name, row.phone_number)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => handleUserDelete(row.id)}>Delete</button>
                </td>
            </tr>
        )
    })
    //working...
    const handleUserDelete = (id) => {
        console.log("Deleting ID: " + id);

        fetch( 'http://localhost:5000/api/users/' + id, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });

    }
    //ready in the front-end
    const handleUserUpdate = (id, username, email_address, first_name, last_name, phone_number) => {
        // e.preventDefault();
        // console.log("Updating ID: " + id);

        setUpdateActive({update: true, id: id, username: username, email_address: email_address, first_name: first_name, last_name: last_name, phone_number: phone_number, restaurant_name: "", address1: "", city: "", state: "", restaurant_phone_number: ""});
    }

    return (
        <>
            <Form>
                <h2>Choose between restaurants and users</h2>
                <Form.Select name="category" onChange={(e)=> setCategory(e.target.value)} className="header-dropdown">
                    <option value="Restaurants">Restaurants</option>
                    <option value="Users">Users</option>
                </Form.Select>
            </Form>

            <table className="admin-page-table">
                <thead>
                    {category === "Restaurants" ? RestaurantHeading() : UserHeading()}
                </thead>
                <tbody>
                    {category === "Restaurants" ? RestaurantData : UserData}
                </tbody>
            </table>

            <div className="update-container">
                {updateActive.update === true &&
                    <AdminUpdate
                        choice={category} update={updateActive.update}  id={updateActive.id}
                        old_username={updateActive.username} old_email_address={updateActive.email_address} old_first_name={updateActive.first_name} old_last_name={updateActive.last_name} old_phone_number={updateActive.phone_number}
                        old_restaurant_name={updateActive.restaurant_name} old_address1={updateActive.address1} old_city={updateActive.city} old_state={updateActive.state} old_restaurant_phone_number={updateActive.restaurant_phone_number}
                    />
                }
            </div>
        </>
    )
}

export default AdminTable;