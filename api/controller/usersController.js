const userModel = require('../model/User');

exports.get_all_users = function (req, res) {
    res.send(userModel.getAllUsers());
}

exports.create_new_user = function (req, res) {

    let newUser = new userModel(req.body);

    const {username, emailAddress, firstName, lastName} = newUser; //deconstructing user object

    if (!username || !emailAddress || !firstName || !lastName) {
        res.status(210).send({error: true, message: 'Incomplete user data received!'})
    } else {
        userModel.addNewUser(newUser, (err, result) => {
            if (err)
                console.log("error in user controller")
            else
                res.json(`Inserted new record ${result}`)
        })
    }
}