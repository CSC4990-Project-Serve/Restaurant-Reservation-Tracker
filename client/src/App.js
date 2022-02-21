import {useState} from "react";

function App() {

    const [user, setUser] = useState(
        fetch('http://localhost:5000/users')
    )

    return (
        <div>
            <h1>Hello World!</h1>
            <p>This is a sample React component.</p>
            <code>{JSON.stringify(user)}</code>
        </div>
    );
}

export default App;
