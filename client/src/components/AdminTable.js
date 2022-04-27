import {useState} from "react";
import AdminUpdate from "../components/AdminUpdate"
import {Form} from "react-bootstrap";

const AdminTable = (props) => {
    const {restaurant_data, user_data} = props;
    const[category, setCategory] = useState("Restaurants");
    const[updateActive, setUpdateActive] = useState({ update: false, id: 0, old_user_data: "", old_restaurant_data: ""});

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
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => handleRestaurantUpdate(row.id, row)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => handleRestaurantDelete(row.id)}>Delete</button>
                </td>
            </tr>
        )
    })
    const handleRestaurantDelete = (id) => {
        fetch(`http://localhost:5000/api/restaurant/${id}`, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });
    }
    const handleRestaurantUpdate = (id, row) => {
        setUpdateActive({update: true, id: id, old_restaurant_data: row, old_user_data: ""});
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
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => handleUserUpdate(row.id, row)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => handleUserDelete(row.id)}>Delete</button>
                </td>
            </tr>
        )
    })
    const handleUserDelete = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });

    }
    const handleUserUpdate = (id, row) => {
        setUpdateActive({update: true, id: id, old_user_data: row, old_restaurant_data: ""});
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
                        old_user_data={updateActive.old_user_data}
                        old_restaurant_data={updateActive.old_restaurant_data}
                    />
                }
            </div>
        </>
    )
}

export default AdminTable;