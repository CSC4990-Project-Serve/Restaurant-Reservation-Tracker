'use strict';

module.exports = function(app) {
    const userController = require('../controller/users.controller');

    app.route('/users')
        .get(userController.getAllUsers)
        .post(userController.createANewUser)

    app.route('/users/:id')
        .get(userController.getUserByID)
        .put(userController.updateUserByID)
}