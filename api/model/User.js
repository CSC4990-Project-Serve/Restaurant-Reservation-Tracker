'use strict';

const conn = require('../model/db');

const User = function (userInfo) {
    // front end is looking for value on right-hand side to be sent (exact naming)
    this.username = userInfo.username;
    this.first_name = userInfo.firstName;
    this.last_name = userInfo.lastName;
    this.phone_number = userInfo.phoneNumber;
    this.hashed_password = userInfo.hashedPassword;
    this.password_salt = userInfo.passwordSalt;
}

User.get_all_users_from_db = (results) => {
    conn.query("SELECT users.id, username, first_name, last_name, phone_number FROM users INNER JOIN user_roles ON users.user_role = user_roles.id", (err, res) => {
        if (err) {
            results(err, null);
        } else {
            results(null, res);
        }
    });
};

User.crate_a_new_user = (newUserToInsert, result) => {
    conn.query("INSERT INTO users set ?", newUserToInsert, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            console.log(`successfully created new user with id: ${res.insertId}`)
            result(null, res.insertId);
        }
    })
}

User.update_a_user = (userID, updatedUserInfo, results) => {
    conn.query("UPDATE users SET username=?, first_name=?, last_name=?, phone_number=?, hashed_password=?, password_salt=?, updatedAt=? WHERE id=?",
        [updatedUserInfo.username, updatedUserInfo.first_name, updatedUserInfo.last_name, updatedUserInfo.phone_number, updatedUserInfo.hashed_password, updatedUserInfo.password_salt, new Date().toISOString().slice(0, 19).replace('T', ' '), userID],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                results(null, res)
            }
        }
    )
}

User.get_user_by_id = (userID, results) => {
    let sql_query = "SELECT users.id, username, first_name, last_name, phone_number FROM users INNER JOIN user_roles ON users.user_role = user_roles.id WHERE users.id=?"
    conn.query(sql_query, userID, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            results(null, res);
        }
    })
}

User.delete_user_by_id = (userID, results) => {
    let sql_query = "DELETE FROM users WHERE users.id = ?";

    conn.query(sql_query, userID, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            res.affectedRows > 0 ? results(null, true) : results(null, false)
        }
    })
}

module.exports = User;