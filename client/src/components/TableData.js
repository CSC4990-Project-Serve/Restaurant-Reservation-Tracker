
const TableData = (props) => {
    const {inventory} = props;
    // const {restaurant_data, user_data} = props;


    const DisplayRestaurant = inventory.map(item => {

        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.restaurant_name}</td>
                <td>{item.restaurant_description}</td>
            </tr>
        )

    })

    return (
        <>
            {DisplayRestaurant}
        </>
    )

}

export default TableData;