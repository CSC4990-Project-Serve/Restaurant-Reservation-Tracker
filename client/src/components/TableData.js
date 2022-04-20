import {Link} from "react-router-dom";

const TableData = (props) => {
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

    const RestaurantData = restaurant_data.data.map(item => {

        // console.log(item.location.location_name);

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.restaurant_name}</td>
                <td>{item.location.address1}</td>
                <td>{item.location.city}</td>
                <td>{item.location.state}</td>
                <td>{item.restaurant_phone_number}</td>

                {/*TODO: fix Link not working here*/}
                {/*<td>*/}
                {/*    <Link to={`/search/${item.id}`}>*/}
                {/*        <button key={item.id} type="button" className="btn btn-dark">More Info</button>*/}
                {/*    </Link>*/}
                {/*</td>*/}

            </tr>
        )
    })

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

    const UserData = user_data.data.map(item => {
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email_address}</td>
                <td>{item.first_name}</td>
                <td>{item.last_name}</td>
                <td>{item.phone_number}</td>
            </tr>
        )
    })

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


        </>
    )
}

export default TableData;