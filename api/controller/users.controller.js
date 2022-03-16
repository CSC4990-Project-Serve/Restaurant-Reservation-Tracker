'use strict';

const User = require('../model/User');

exports.getAllUsers = function (req, res) {
    User.get_all_users_from_db((error, results) => {
        if (error) {
            // res.send(JSON.stringify(error))
            res.send({Error: "an error occurred in getting all users"})
        } else {
            console.log(results)
            res.send(results);
        }
    })
}

exports.createANewUser = function (req, res) {
    let newUser = new User(req.body);

    if (!newUser.username || !newUser.first_name || !newUser.last_name || !newUser.phone_number || !newUser.hashed_password) {
        res.status(400).send({error: true, message: 'Please provide full user information'});
    } else {
        User.crate_a_new_user(newUser, (err, results) => {
            if (err) {
                console.log(err);
                res.send(err)
            } else {
                res.send({error: false, status: `New user created with id: ${results}`})
            }
        })
    }
}

exports.getUserByID = (req, res) => {
    res.send(`Id requested is: ${req.params.id}`)
}

exports.updateUserByID = (req, res) => {
    let updatedUser = new User(req.body);

    if(!updatedUser.username) {
        res.status(400).search("Error: Not fully detailed update")
    } else {
        User.update_a_user(req.params.id, updatedUser, (err, results) => {
            if(err) {
                res.send(err)
            } else {
                res.json(results)
            }
        })
    }
}