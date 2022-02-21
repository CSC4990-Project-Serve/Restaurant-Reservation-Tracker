const userModel = require('../model/User')

exports.get_all_users = function (req, res) {
    res.send(userModel.getAllUsers());
}