const sqlDB = require('./db');

let User = function (userRequest) {
    const {username, emailAddress, firstName, lastName} = userRequest; //deconstructing req.body

    this.username = username;
    this.emailAddress = emailAddress;
    this.firstName = firstName;
    this.lastName = lastName;
}

User.getAllUsers = () => {
    let user = {
        username: "JSmith01",
        firstName: "James",
        lastName: "Smith",
        age: 18
    };
    return user;
}

User.addNewUser = (userData, results) => {
    // sqlDB.query('INSERT INTO users set ?', userData, (error, results) => {
    //     if (error) throw error;
    //     console.log(`Successfully inserted new user`);
    //     result(results);
    // })
    console.log(`Data received in Users: ${userData.firstName}`)
    results(null, "success")
    console.log("Executed SQL Query");
}

module.exports = User;