'use strict';

module.exports = function (app) {
    const restaurantController = require('../controller/restaurant.controller')

    app.route('/restaurant')
        .get(restaurantController.getAllRestaurants)
        .post(restaurantController.addNewRestaurant)

    app.route('/restaurant/:id')
        .get(restaurantController.getRestaurantByID)
        .put(restaurantController.updateRestaurantByID)
        .delete(restaurantController.deleteRestaurantByID)

    app.route('/search/:searchTerm')
        .get(restaurantController.searchForRestaurant)
}