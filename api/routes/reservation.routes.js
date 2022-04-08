'use strict';

module.exports = function (app) {
    let reservationController = require('../controller/reservation.controller');
    app.route('/api/reservations')
        .get(reservationController.getReservations)
        .post(reservationController.createReservation);

    app.route('/api/reservations/:id')
        .get(reservationController.getReservationsByRestaurantId)
        .put(reservationController.updateReservationById)
        .patch(reservationController.patchReservationById)
        .delete(reservationController.deleteReservationById);
}