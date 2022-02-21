import {useEffect, useState} from "react";

function App() {

    const [user, setUser] = useState()

    useEffect(() => {
        const getUsers = async () => {
            const usersFromServer = await getUsersFromAPI();
            setUser(usersFromServer)
        }

        getUsers();
    }, [])


    // Get all users from server
    const getUsersFromAPI = async () => {
        const res = await fetch('http://localhost:5000/users');
        const data = await res.json();

        return data;
    }


    return (
        <div>
            <h1>Hello World!</h1>
            <p>This is a sample React component.</p>
            <code>{JSON.stringify(user)}</code>
        </div>
    );
}

export default App;
