'use strict';

const conn = require('../model/db');
const bcrypt = require("bcrypt");

const User = function (userInfo) {
    // front end is looking for value on right-hand side to be sent (exact naming)
    this.id = userInfo.id;
    this.username = userInfo.username;
    this.email_address = userInfo.email_address;
    this.first_name = userInfo.first_name;
    this.last_name = userInfo.last_name;
    this.phone_number = userInfo.phone_number;
    this.hashed_password = userInfo.hashed_password;
    this.password_salt = userInfo.password_salt;
    this.reservations;
}

User.get_all_users_from_db = (results) => {
    let get_all_users_query = `SELECT users.id, username, email_address, first_name, last_name, phone_number
                               FROM users
                                        INNER JOIN user_roles ON users.user_role = user_roles.id`;

    // Updated to use explicit pool connection
    // (But not needed for everything. conn.query still works with the pool. It does the same thing and automatically calls conn.release() )
    conn.getConnection((err, connection) => {
        if (err) {
            results(err, null);
        } else {
            conn.query(get_all_users_query, (err, res) => {
                if (err) {
                    results(err, null);
                } else {
                    results(null, res);
                }
            });

            connection.release();
        }
    })

};

User.crate_a_new_user = (newUserToInsert, result) => {
    let create_new_user_query = `INSERT INTO users
                                 SET ?`;

    conn.query(create_new_user_query, newUserToInsert, (err, res) => {
        if (err) {
            result(err, null);
        } else {
            console.log(`successfully created new user with id: ${res.insertId}`)
            result(null, res.insertId);
        }
    })
}

User.update_a_user = (userID, updatedUserInfo, results) => {
    let update_users_query = `UPDATE users
                              SET username=?,
                                  email_address=?,
                                  first_name=?,
                                  last_name=?,
                                  phone_number=?,
                                  hashed_password=?,
                                  password_salt=?,
                                  updatedAt=?
                              WHERE id = ?`;
    conn.query(update_users_query,
        [updatedUserInfo.username, updatedUserInfo.email_address, updatedUserInfo.first_name, updatedUserInfo.last_name, updatedUserInfo.phone_number, updatedUserInfo.hashed_password, updatedUserInfo.password_salt, new Date().toISOString().slice(0, 19).replace('T', ' '), userID],
        (err, res) => {
            if (err) {
                console.log(err)
            } else {
                res.affectedRows > 0 ? results(null, true) : results(null, false);
            }
        }
    )
}

User.get_user_by_id = (userID, results) => {
    let sql_query = `SELECT users.id, username, email_address, first_name, last_name, phone_number
                     FROM users
                              INNER JOIN user_roles ON users.user_role = user_roles.id
                     WHERE users.id = ?`
    conn.query(sql_query, userID, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else if (res.length > 0) {
            results(null, new User(res[0]));
        } else {
            results(null, res)
        }
    })
}

User.get_user_by_id_with_reservations = (userID, results) => {
    let get_user_by_id_query = `SELECT users.id, username, email_address, first_name, last_name, phone_number
                                FROM users
                                         INNER JOIN user_roles ON users.user_role = user_roles.id
                                WHERE users.id = ?`

    let reservations_query = `SELECT rr.id reservation_id,
                                     r.restaurant_name,
                                     reservation_date,
                                     reservation_time,
                                     purpose,
                                     reservation_status
                              FROM users
                                       INNER JOIN restaurant_reservations rr on users.id = rr.userID
                                       INNER JOIN restaurants r on rr.restaurantID = r.id
                              WHERE userID = ?;`

    conn.query(get_user_by_id_query, userID, (err, usersRes) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else if (usersRes.length === 1) {
            // only try to get reservation data if the supplied id was valid and found a user
            conn.query(reservations_query, userID, (err, reservationRes) => {
                if (err) {
                    console.log(err);
                    results(err, null);
                } else {
                    //build the user object here from the results of the user query
                    let user_obj = new User(usersRes[0]);

                    // add the reservations array to the user_obj
                    user_obj.reservations = reservationRes;

                    results(null, user_obj); //return no error AND the newly created user object
                }
            })
        } else {
            // no users found
            results(null, usersRes)
        }
    })
}

User.delete_user_by_id = (userID, results) => {
    let sql_query = `DELETE
                     FROM users
                     WHERE users.id = ?`;

    conn.query(sql_query, userID, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            res.affectedRows > 0 ? results(null, true) : results(null, false)
        }
    })
}

User.validate_login = (username, email, password, results) => {
    const bcrypt = require('bcrypt');

    let sql_query = `SELECT users.id, username, email_address, first_name, last_name, phone_number
                     FROM users
                              INNER JOIN user_roles ON users.user_role = user_roles.id
                     WHERE (users.username = ? OR users.email_address = ?)
                       AND users.hashed_password = ?`;

    let get_salt = `SELECT password_salt
                    FROM users
                    WHERE (users.username = ? OR users.email_address = ?)`;

    conn.query(get_salt, [username, email], (err, saltRes) => {
        if (err) {
            console.log(err)
            results(err, null)
        } else {
            let user_salt = saltRes[0].password_salt;

            if (user_salt === null || user_salt === "") {
                results({error: "No db salt for user"}, null)
            } else {
                let hash_val = bcrypt.hashSync(password, user_salt);

                conn.query(sql_query, [username, email, hash_val], (err, loginRes) => {
                    if (err) {
                        console.log(err);
                        results(err, null);
                    } else if (loginRes.length > 0) {
                        results(null, loginRes)
                    } else {
                        results(null, false)
                    }
                })
            }
        }
    })
}

User.get_user_salt = (username, email_address, results) => {
    let get_salt = `SELECT password_salt
                    FROM users
                    WHERE (users.username = ? OR users.email_address = ?)`;

    conn.query(get_salt, [username, email_address], (err, res) => {
        if (err) {
            console.log(err);
            results(err, null)
        } else {
            console.log(results);
            results(null, res[0])
        }
    })
}

module.exports = User;