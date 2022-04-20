import {Link} from "react-router-dom";

const TableData = (props) => {
    const {choice, restaurant_data, user_data} = props;

    console.log(choice);
    // console.log(restaurant_data.data[0]);
    // console.log(user_data);
    // console.log(user_data.data.json());


    const DisplayRestaurants = restaurant_data.data.map(item => {

        // console.log(item);

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.restaurant_name}</td>
                {/*TODO: fix Link not working here*/}
                {/*<td>*/}
                {/*    <Link to={`/search/${item.id}`}>*/}
                {/*        <button key={item.id} type="button" className="btn btn-dark">More Info</button>*/}
                {/*    </Link>*/}
                {/*</td>*/}
            </tr>
        )

    })

    const DisplayUsers = user_data.data.map(item => {
        // console.log(item);

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
            </tr>
        )

    })

    return (
        <>
            {choice === "Restaurants" ? DisplayRestaurants : DisplayUsers}
        </>
    )

}

export default TableData;