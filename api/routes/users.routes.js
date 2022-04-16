'use strict';

module.exports = function (app) {
    const userController = require('../controller/users.controller');

    // Get all users and create a new user
    app.route('/api/users')
        .get(userController.getAllUsers)
        .post(userController.createANewUser)

    // Get/update/delete specific user by their id
    app.route('/api/users/:id')
        .get(userController.getUserByID)
        .put(userController.updateUserByID)
        .delete(userController.deleteUserByID)

    app.route('/api/login')
        .post(userController.validate_user_login)

    app.route('/api/login/salt')
        .post(userController.get_user_salt_by_email_or_username)
}