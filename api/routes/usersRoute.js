module.exports = function usersRoute(app) {
    const controller = require('../controller/usersController');

    app.route('/users')
        .get(controller.get_all_users)
        .post(controller.create_new_user)

}