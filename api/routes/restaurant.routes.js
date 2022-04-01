'use strict';

module.exports = function (app) {
    const restaurantController = require('../controller/restaurant.controller')
    const reservationController = require('../controller/reservation.controller')

    app.route('/api/restaurant')
        .get(restaurantController.getAllRestaurants)
        .post(restaurantController.addNewRestaurant)

    // do it this way or in the reservation routes ?????
    // todo: need help here. How do the front-end guys want to get the reservation info?
    app.route('/api/restaurant/reservation')
        .get(reservationController.getReservationsByRestaurantId)

    app.route('/api/restaurant/:id')
        .get(restaurantController.getRestaurantByID)
        .put(restaurantController.updateRestaurantByID)
        .delete(restaurantController.deleteRestaurantByID)

    app.route('/api/search/:searchTerm')
        .get(restaurantController.searchForRestaurant)
}