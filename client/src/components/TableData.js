
const TableData = (props) => {
    const {restaurant_data, user_data} = props;

    const DisplayChoice = restaurant_data.map(item => {

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
            {DisplayChoice}
        </>
    )

}

export default TableData;