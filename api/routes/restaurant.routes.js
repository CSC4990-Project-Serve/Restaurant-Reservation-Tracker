'use strict';

module.exports = function (app) {
    const restaurantController = require('../controller/restaurant.controller')

    app.route('/api/restaurant')
        .get(restaurantController.getAllRestaurants)
        .post(restaurantController.addNewRestaurant)

    app.route('/api/restaurant/:id')
        .get(restaurantController.getRestaurantByID)
        .put(restaurantController.updateRestaurantByID)
        .delete(restaurantController.deleteRestaurantByID)

    app.route('/api/search/:searchTerm')
        .get(restaurantController.searchForRestaurant)
}