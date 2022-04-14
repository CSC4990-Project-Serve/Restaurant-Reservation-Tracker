'use strict';

const conn = require('./db');

const Reservation = function (reservation) {
    this.id = reservation.id;
    this.reservation_date = reservation.reservation_date;
    this.reservation_time = reservation.reservation_time;
    this.purpose = reservation.purpose;
    this.party_size = reservation.party_size;
    this.userID = reservation.userID;
    this.reservation_status = reservation.reservation_status;
    this.restaurantID = reservation.restaurantID;
};

Reservation.getAll = function (result) {
    let sql_query = `SELECT restaurant_reservations.id AS reservation_id,
                            reservation_date,
                            reservation_time,
                            purpose,
                            party_size,
                            reservation_status,
                            restaurantID,
                            restaurant_name,
                            restaurant_description,
                            restaurant_phone_number,
                            userID,
                            username,
                            email_address,
                            first_name,
                            last_name,
                            phone_number
                     FROM restaurant_reservations
                              INNER JOIN restaurants ON restaurant_reservations.restaurantID = restaurants.id
                              INNER JOIN users ON restaurant_reservations.userID = users.id`;
    conn.query(sql_query, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            // console.log('reservations : ', res);
            result(null, res);
        }
    });
};

Reservation.get_by_id = function (id, result) {
    let sql_query = `SELECT restaurant_reservations.id AS reservation_id,
                            reservation_date,
                            reservation_time,
                            purpose,
                            party_size,
                            reservation_status,
                            restaurantID,
                            restaurant_name,
                            restaurant_description,
                            restaurant_phone_number,
                            userID,
                            username,
                            email_address,
                            first_name,
                            last_name,
                            phone_number
                     FROM restaurant_reservations
                              INNER JOIN restaurants r on restaurant_reservations.restaurantID = r.id
                              INNER JOIN users u on restaurant_reservations.userID = u.id
                     WHERE restaurant_reservations.id = ?`;
    conn.query(sql_query, id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            // console.log('reservation : ', res);
            result(null, res[0]);
        }
    });
};

Reservation.create_new_reservation = function (new_reservation, result) {
    let sql_query = `INSERT INTO restaurant_reservations
                     SET ?`;
    conn.query(sql_query, new_reservation, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
        } else {
            console.log('reservation inserted: ', res);
            if (res.insertId != null) {
                result(null, res.insertId);
            }
        }
    });
};

Reservation.update_reservation_by_id = function (idToUpdate, reservationToUpdate, results) {
    const update_reservation_query = `UPDATE restaurant_reservations
                                      SET reservation_date   = ?,
                                          reservation_time   = ?,
                                          purpose            = ?,
                                          party_size         = ?,
                                          userID             = ?,
                                          reservation_status = ?
                                      WHERE id = ?`;

    conn.query(update_reservation_query,
        [reservationToUpdate.reservation_date, reservationToUpdate.reservation_time, reservationToUpdate.purpose, reservationToUpdate.party_size, reservationToUpdate.userID, reservationToUpdate.reservation_status, idToUpdate],
        (err, updateRes) => {
            if (err) {
                // will also return err if the userID or restaurantID foreign key constraint fails
                results(err, null);
            } else if (updateRes.affectedRows > 0) {
                results(null, true);
            } else {
                // if no rows were updated, send back false to be dealt with in controller
                results(null, false);
            }
        });
};

Reservation.delete_reservation_by_id = function (idToDelete, results) {
    const delete_query = `DELETE
                          FROM restaurant_reservations
                          WHERE id = ?`;

    conn.query(delete_query, idToDelete, (err, res) => {
        if (err) {
            results(err, null);
        } else if (res.affectedRows > 0) {
            results(null, true);
        } else {
            results(null, false);
        }
    });
}

module.exports = Reservation;