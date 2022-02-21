class User {
    constructor(username, firstName, lastName) {
        this._username = username;
        this._firstName = firstName;
        this._lastName = lastName;
    }

    get username() {
        return this._username;
    }

    set username(value) {
        this._username = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }
}

function getAllUsers() {
    return {id: 1, name: "Jared", age: 21};
}

module.exports = {User, getAllUsers}