'use strict';

const Restaurant = require('../model/Restaurant');

exports.getAllRestaurants = function (req, res) {
    Restaurant.get_all_restaurants_from_db((err, results) => {
        if (err) {
            res.send(err);
        } else {
            res.send(results)
        }
    });
}

exports.addNewRestaurant = function (req, res) {
    const newRestaurant = new Restaurant(req.body);
    console.log(req.body);
    console.log(`New Restaurant: ${newRestaurant}`);

    if (!newRestaurant.restaurant_name || !newRestaurant.restaurant_description || !newRestaurant.restaurant_phone_number) {
        res.status(400).send({error: true, message: `Make sure all required restaurant information is entered`})
    } else {
        Restaurant.create_new_restaurant(newRestaurant, (error, results) => {
            if (error) {
                res.send(error);
            } else {
                res.send(results);
            }
        });
    }
}

exports.getRestaurantByID = function (req, res) {
    let restaurantID = req.params.id;

    if (!restaurantID) {
        res.status(400).send({error: true, message: "No provided restaurant id"})
    } else {
        Restaurant.get_restaurant_by_id(restaurantID, (err, results) => {
            if (err) {
                res.send(err);
            } else {
                if (results.length === 0) {
                    //send error
                    res.status(404).send({error: true, message: `No restaurant found with id ${restaurantID}`})
                } else {
                    res.send(results);
                }
            }
        })
    }
}

exports.updateRestaurantByID = function (req, res) {

}

exports.deleteRestaurantByID = function (req, res) {

}

exports.searchForRestaurant = function (req, res) {
    let searchTerm = req.params.searchTerm;

    // We can get more parameters later if we want and send them in to the search function
    // We're just searching the same date 6 times over for the time being
    // 6 being the num of search parameters identified in the Model
    let newSearchTerm = Array(6).fill(searchTerm); //temporary

    if (!searchTerm) {
        res.send(404).status("Error no search term specified")
    } else {
        Restaurant.search_by_key_term(newSearchTerm, (err, results) => {
            if (err) {
                res.send(err)
            } else {
                res.send(results);
            }
        })
    }

}