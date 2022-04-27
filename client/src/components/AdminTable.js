import {useState} from "react";
import AdminUpdate from "../components/AdminUpdate"
import {Form} from "react-bootstrap";

const AdminTable = (props) => {
    const {restaurant_data, user_data} = props;
    const[category, setCategory] = useState("Restaurants");
    const[updateActive, setUpdateActive] = useState(
        {
            update: false, id: 0,
            username: "", email_address: "", first_name: "", last_name: "", phone_number: "",
            restaurant_name: "", restaurant_description: "", star_rating: "", restaurant_phone_number: "",
            address1: "", city: "", state: "", postal_code: "", country: "",
            monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: ""
        });

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
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => handleRestaurantUpdate(row.id, row.restaurant_name, row.restaurant_description, row.star_rating, row.restaurant_phone_number, row.location.address1, row.location.city, row.location.state, row.location.postal_code, row.location.country, row.hours.monday, row.hours.tuesday, row.hours.wednesday, row.hours.thursday, row.hours.friday, row.hours.saturday, row.hours.sunday)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => handleRestaurantDelete(row.id, )}>Delete</button>
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
    const handleRestaurantUpdate = (id, restaurant_name, restaurant_description, star_rating, restaurant_phone_number, address1, city, state, postal_code, country, monday, tuesday, wednesday, thursday, friday, saturday, sunday) => {
        setUpdateActive(
            {
                update: true, id: id,
                restaurant_name: restaurant_name, restaurant_description: restaurant_description, star_rating: star_rating, restaurant_phone_number: restaurant_phone_number,
                address1: address1, city: city, state: state, postal_code: postal_code, country: country,
                monday: monday, tuesday: tuesday, wednesday: wednesday, thursday: thursday, friday: friday, saturday: saturday, sunday: sunday,
                username: "", email_address: "", first_name: "", last_name: "", phone_number: ""
            });
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
    const handleUserDelete = (id) => {
        fetch(`http://localhost:5000/api/users/${id}`, {
            method: 'DELETE',
        }).then(() => {
            alert("Delete successful.");
            window.location.reload();
        });

    }
    const handleUserUpdate = (id, username, email_address, first_name, last_name, phone_number) => {
        setUpdateActive(
            {
                update: true, id: id,
                username: username, email_address: email_address, first_name: first_name, last_name: last_name, phone_number: phone_number,
                restaurant_name: "", restaurant_description: "", star_rating: "", restaurant_phone_number: "",
                address1: "", city: "", state: "", postal_code: "", country: "",
                monday: "", tuesday: "", wednesday: "", thursday: "", friday: "", saturday: "", sunday: ""
            });
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
                        old_restaurant_name={updateActive.restaurant_name} old_restaurant_description={updateActive.restaurant_description} old_restaurant_phone_number={updateActive.restaurant_phone_number} old_star_rating={updateActive.star_rating}
                        old_address1={updateActive.address1} old_city={updateActive.city} old_state={updateActive.state} old_postal_code={updateActive.postal_code} old_country={updateActive.country}
                        old_monday={updateActive.monday} old_tuesday={updateActive.tuesday} old_wednesday={updateActive.wednesday} old_thursday={updateActive.thursday} old_friday={updateActive.friday} old_saturday={updateActive.saturday} old_sunday={updateActive.sunday}
                    />
                }
            </div>
        </>
    )
}

export default AdminTable;