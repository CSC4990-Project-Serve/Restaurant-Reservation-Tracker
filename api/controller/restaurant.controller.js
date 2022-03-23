'use strict';

const Restaurant = require('../model/Restaurant');

exports.getAllRestaurants = function (req, res) {
    Restaurant.get_all_restaurants_from_db((err, results) => {
        if(err) {
            res.send(err);
        } else {
            res.send(results)
        }
    });
}

exports.addNewRestaurant = function (req, res) {

}

exports.getRestaurantByID = function (req, res) {

}

exports.updateRestaurantByID = function (req, res) {

}

exports.deleteRestaurantByID = function (req, res) {

}