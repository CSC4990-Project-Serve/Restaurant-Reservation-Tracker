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
    let updatedRestaurant;

    // fixme: need to fix this part
    //  we cant just update the hours,location, and restaurant with the same id.
    //  the hours and location may have a different id.
    //  how to deal with this????
    // Restaurant.get_restaurant_by_id(restaurantIDtoUpdate, (err, results) => {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         updatedRestaurant = results;
    //     }
    // });

    // if (!restaurantIDtoUpdate) {
    //     res.status(400).send({error: true, message: `No restaurant id provided`})
    // } else {
    //     Restaurant.update_by_id(restaurantIDtoUpdate, updatedRestaurant, (err, results) => {
    //         if (err) {
    //             res.send(err);
    //         } else if (results) {
    //             res.send({error: false, message: `Restaurant with id ${restaurantIDtoUpdate} updated`});
    //         } else {
    //             res.status(404).send({error: true, message: `No restaurant found with id ${restaurantIDtoUpdate}`})
    //         }
    //     });
    // }

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
