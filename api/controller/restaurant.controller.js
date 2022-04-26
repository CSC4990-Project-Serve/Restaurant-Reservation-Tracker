'use strict';

const Restaurant = require('../model/Restaurant');
const hoursModel = require('../model/RestaurantHours');
const locationModel = require('../model/RestaurantLocation');

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
    let reservationsIncluded = parseInt(req.query.reservations);

    console.log(`Should include reservations: ${reservationsIncluded}`);

    if (!restaurantID) {
        res.status(400).send({error: true, message: "No provided restaurant id"})
    } else {

        if (reservationsIncluded === 1) {
            // Get restaurant with reservations included
            Restaurant.get_restaurant_by_id_with_reservations(restaurantID, (error, results) => {
                if (error) {
                    res.send(error);
                } else {
                    if (results.length === 0) {
                        //send error
                        res.status(404).send({
                            error: true, message: `No restaurant/reservation combination found with id ${restaurantID}`
                        })
                    } else {
                        res.send(results);
                    }
                }
            })
        } else {
            // don't include the reservations in the response
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
}

exports.updateRestaurantByID = function (req, res) {
    const restaurantIDtoUpdate = req.params.id;
    let updatedRestaurant = new Restaurant(req.body);

    if (!restaurantIDtoUpdate) {
        res.status(400).send({error: true, message: `No restaurant id provided`})
    } else {
        //get the location id
        hoursModel.get_hours_by_restaurant_id(restaurantIDtoUpdate, (err, hoursData) => {
            if (err) {
                res.status(400).send({
                    error: true,
                    message: `No hours found for restaurant with id ${restaurantIDtoUpdate}`
                })
            } else {
                const hoursID = hoursData.id;

                locationModel.get_location_by_restaurant_id(restaurantIDtoUpdate, (err, locationData) => {
                    if (err) {
                        res.status(400).send({
                            error: true,
                            message: `No location found for restaurant with id ${restaurantIDtoUpdate}`
                        })
                    } else {
                        const locationID = locationData.id;

                        Restaurant.update_by_id(restaurantIDtoUpdate, hoursID, locationID, updatedRestaurant, (err, updateResults) => {
                            if (err) {
                                res.status(400).send({
                                    error: true,
                                    message: `Error updating restaurant information for id ${restaurantIDtoUpdate}`
                                })
                            } else {
                                console.log(`updateRes is: ${updateResults}`);
                                res.status(200).send({error: false, message: "Update success!"})
                            }
                        })
                    }
                })
            }
        })
    }
}

exports.deleteRestaurantByID = function (req, res) {
    let restaurantIDtoDelete = req.params.id;

    if (!restaurantIDtoDelete || isNaN(restaurantIDtoDelete)) {
        res.status(400).send({error: true, message: `No restaurant id provided`})
    } else {
        locationModel.get_location_by_restaurant_id(restaurantIDtoDelete, (err, locationResults) => {
            if (err) {
                // console.log(err);
                res.status(400).send({
                    error: true,
                    message: `Error finding location for restaurant with id ${restaurantIDtoDelete}`
                })
            } else {
                const locationID = locationResults.id;

                hoursModel.get_hours_by_restaurant_id(restaurantIDtoDelete, (err, hoursResults) => {
                    if (err) {
                        // console.log(err);
                        res.status(400).send({
                            error: true,
                            message: `Error finding hours for restaurant with id ${restaurantIDtoDelete}`
                        })
                    } else {
                        const hoursID = hoursResults.id;

                        Restaurant.delete_restaurant_by_restaurantID(restaurantIDtoDelete, locationID, hoursID, (err, deleteResults) => {
                            if (err) {
                                res.status(400).send({
                                    error: true,
                                    message: `Error deleting restaurant with id ${restaurantIDtoDelete}`
                                })
                            } else {
                                // console.log(`deleteRes is: ${deleteResults}`);
                                res.send({
                                    error: false,
                                    status: `Restaurant with id:${restaurantIDtoDelete} was permanently deleted`
                                })
                            }
                        })
                    }
                })

            }
        })
    }
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
