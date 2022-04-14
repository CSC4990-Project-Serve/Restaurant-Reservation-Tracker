'use strict';

const Reservation = require('../model/Reservation');

exports.getReservations = function (req, res) {
    Reservation.getAll(function (err, reservations) {
        if (err) {
            res.send(err);
        } else {
            res.json(reservations);
        }
    });
};

exports.getReservationsByRestaurantId = function (req, res) {
    let reservationId = req.params.id;

    Reservation.get_by_id(reservationId, (err, reservation) => {
        if (err) {
            res.send(err)
        } else {
            if (reservation != null) {
                res.json(reservation);
            } else {
                res.status(404).send({error: true, message: `No reservation found with id ${reservationId}`})
            }
        }
    })
};

exports.createReservation = function (req, res) {
    let newReservation = new Reservation(req.body);

    Reservation.create_new_reservation(newReservation, (err, reservationResult) => {
        if (err) {
            console.log(err);
            res.status(404).send({error: true, message: `Error: ${err}`});
        } else {
            res.json(`Successfully created a new reservation with id: ${reservationResult}`)
        }
    })
}

exports.updateReservationById = function (req, res) {
    const reservationIdToUpdate = req.params.id;
    const reservationToUpdate = new Reservation(req.body);

    //create an array of the properties without the id that are null or missing in the reservation object
    const missingProperties = Object.keys(reservationToUpdate).filter(key => key !== "id" && reservationToUpdate[key] == null || reservationToUpdate[key] === "");

    if (reservationIdToUpdate == null) {
        res.status(400).send({error: true, message: `No supplied reservation id to update`});
    } else if (!reservationToUpdate.reservation_date || !reservationToUpdate.reservation_time || !reservationToUpdate.purpose || !reservationToUpdate.party_size || !reservationToUpdate.userID || !reservationToUpdate.reservation_status || !reservationToUpdate.restaurantID) {
        res.status(400).send({
            error: true,
            message: `Please make sure you supply all the reservation info for this PUT request!`,
            sent_data: reservationToUpdate,
            missing_data: missingProperties, //maybe implement later what fields are missing based on the supplied data
        })
    } else {
        Reservation.update_reservation_by_id(reservationIdToUpdate, reservationToUpdate, (err, result) => {
            if (err) {
                console.log(err);
                res.json({error: true, message: err});
            } else if (result) {
                res.json({
                    error: false,
                    status: `Reservation with id ${reservationIdToUpdate} was successfully updated`
                })
            } else {
                res.json({error: true, message: `error updating reservation with id: ${reservationIdToUpdate}`});
            }
        })
    }
}

exports.patchReservationById = function (req, res) {
    res.status(201).send(`PATCH Not implemented yet`);
}

exports.deleteReservationById = function (req, res) {
    const reservationIdToDelete = req.params.id;

    if (!reservationIdToDelete) {
        res.status(400).send({error: true, message: `No supplied reservation id to delete`});
    } else {
        Reservation.delete_reservation_by_id(reservationIdToDelete, (err, results) => {
            if (err) {
                res.send(err)
            } else if (results) {
                res.json({
                    error: false,
                    status: `Reservation with id ${reservationIdToDelete} was successfully deleted`
                })
            } else {
                res.json({error: true, message: `error deleting reservation with id: ${reservationIdToDelete}`});
            }
        })
    }
}