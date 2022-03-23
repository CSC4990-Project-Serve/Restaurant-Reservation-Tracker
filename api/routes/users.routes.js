'use strict';

module.exports = function(app) {
    const userController = require('../controller/users.controller');

    // Get all users and create a new user
    app.route('/users')
        .get(userController.getAllUsers)
        .post(userController.createANewUser)

    // Get/update/delete specific user by their id
    app.route('/users/:id')
        .get(userController.getUserByID)
        .put(userController.updateUserByID)
        .delete(userController.deleteUserByID)

    app.route('/login')
        .post(userController.validate_user_login)
}