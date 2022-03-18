'use strict';

const User = require('../model/User');

// Get all the users from the database
exports.getAllUsers = function (req, res) {
    User.get_all_users_from_db((error, results) => {
        if (error) {
            // res.send(JSON.stringify(error))
            res.send({error: true, message: "An error occurred in getting all users"})
        } else {
            console.log(results)
            res.send(results);
        }
    })
}

// Add a new user to the database
exports.createANewUser = function (req, res) {
    let newUser = new User(req.body);
    console.log(newUser)

    if (!newUser.username || !newUser.first_name || !newUser.last_name || !newUser.phone_number || !newUser.hashed_password || !newUser.password_salt) {
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


// Individual User CRUD methods
exports.getUserByID = (req, res) => {
    // res.send(`Id requested is: ${req.params.id}`)
    let userIDtoUpdate = req.params.id;

    if (!userIDtoUpdate) {
        res.status(400).send({error: true, message: "No provided user id"}) //don't think this is ever triggered because of the route
    } else {
        User.get_user_by_id(userIDtoUpdate, (err, results) => {
            // If our results array is empty, error out
            if (err || results.length === 0) {
                res.json({
                    error: true,
                    message: `Error finding user with id: ${userIDtoUpdate}`
                });
            } else {
                res.json(results)
            }
        })
    }

}

exports.updateUserByID = (req, res) => {
    let updatedUser = new User(req.body);

    // isNaN make sure the user id from the url is a number, if not throw the error below
    if (!updatedUser.username || !updatedUser.first_name || !updatedUser.last_name || !updatedUser.phone_number || isNaN(req.params.id)) {
        res.status(400).send({error: true, status: "Error: Not fully detailed update"})
    } else {
        User.update_a_user(req.params.id, updatedUser, (err, results) => {
            if (err) {
                res.send(err)
            } else {
                results ? res.send({error: false, status: `User ${req.params.id} updated`}) : res.send({error: true, status: `User not updated or not found`})
            }
        })
    }
}

exports.deleteUserByID = (req, res) => {
    let userIDtoDelete = req.params.id;

    if (!userIDtoDelete || isNaN(userIDtoDelete)) {
        res.status(400).send({error: true, status: "malformed input"})
    } else {
        User.delete_user_by_id(userIDtoDelete, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                results ? res.send({
                    error: false,
                    status: `User with id:${userIDtoDelete} was permanent deleted`
                }) : res.send({error: true, status: `User was not deleted or not found`})
            }
        });
    }
}