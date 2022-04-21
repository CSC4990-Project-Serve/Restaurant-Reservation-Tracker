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

    function DeleteRow(id) {
        console.log("Deleting ID: " + id);

        // TODO: Delete route not implemented yet
        // axios.delete('http://localhost:5000/api/restaurant/' + id)
        // .then(response => console.log(response))
        // .catch(error => {
        //     console.error('There was an error!', error);
        // });
    }

    function UpdateRow(id) {
        console.log("Updating ID: " + id);
        // TODO: Update route not implemented yet
    }

    const RestaurantData = restaurant_data.data.map(row => {

        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.restaurant_name}</td>
                <td>{row.location.address1}</td>
                <td>{row.location.city}</td>
                <td>{row.location.state}</td>
                <td>{row.restaurant_phone_number}</td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => UpdateRow(row.id)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => DeleteRow(row.id)}>Delete</button>
                </td>

                {/*TODO: fix Link not working here*/}
                {/*<td>*/}
                {/*    <Link to={`/search/${row.id}`}>*/}
                {/*        <button key={row.id} type="button" className="btn btn-dark">More Info</button>*/}
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

    const UserData = user_data.data.map(row => {
        return (
            <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.username}</td>
                <td>{row.email_address}</td>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.phone_number}</td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-success" onClick={() => UpdateRow(row.id)}>Update</button>
                </td>
                <td className="td-button">
                    <button key={row.id} type="button" className="btn btn-danger" onClick={() => DeleteRow(row.id)}>Delete</button>
                </td>
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

export default AdminTable;