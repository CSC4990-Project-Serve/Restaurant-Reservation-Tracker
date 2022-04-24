// noinspection JSUnresolvedFunction

'use strict';

const conn = require('./db');

const Restaurant = function (restaurantInfo) {
    this.id = restaurantInfo.id;
    this.restaurant_name = restaurantInfo.restaurant_name;
    this.restaurant_description = restaurantInfo.restaurant_description;
    this.restaurant_phone_number = restaurantInfo.restaurant_phone_number;
    this.star_rating = restaurantInfo.star_rating;
    this.location = {
        location_id: restaurantInfo.location_id,
        location_name: restaurantInfo.location_name,
        address1: restaurantInfo.address1,
        address2: restaurantInfo.address2,
        city: restaurantInfo.city,
        state: restaurantInfo.state,
        postal_code: restaurantInfo.postal_code,
        country: restaurantInfo.country,
    };
    this.hours = {
        hours_id: restaurantInfo.hours_id,
        monday: restaurantInfo.monday,
        tuesday: restaurantInfo.tuesday,
        wednesday: restaurantInfo.wednesday,
        thursday: restaurantInfo.thursday,
        friday: restaurantInfo.friday,
        saturday: restaurantInfo.saturday,
        sunday: restaurantInfo.sunday,
    };
    this.menu = restaurantInfo.menu;
    this.photos = restaurantInfo.photos;
    this.reservations;
}

Restaurant.get_all_restaurants_from_db = (results) => {
    let sql_query = `SELECT restaurants.id,
                            restaurant_name,
                            restaurant_description,
                            restaurant_phone_number,
                            star_rating,
                            location_name,
                            rl.id location_id,
                            address1,
                            address2,
                            city,
                            state,
                            postal_code,
                            country,
                            rh.id hours_id,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday,
                            sunday,
                            menu_description,
                            path_to_menu,
                            menu_web_link
                     FROM restaurants
                              LEFT JOIN restaurant_locations rl on restaurants.location_ID = rl.id
                              LEFT JOIN restaurant_hours rh on restaurants.restaurant_hours = rh.id
                              LEFT JOIN restaurant_menus rm on restaurants.menu_ID = rm.id`;

    conn.query(sql_query, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            const restaurants = [];

            // convert raw SQL response to Restaurant objects
            res.forEach((item) => {
                restaurants.push(new Restaurant(item))
            })

            results(null, restaurants);
        }
    })
}

Restaurant.get_restaurant_by_id = (restaurantID, results) => {
    let sql_query = `SELECT restaurants.id,
                            restaurant_name,
                            restaurant_description,
                            restaurant_phone_number,
                            star_rating,
                            rl.id location_id,
                            location_name,
                            address1,
                            address2,
                            city,
                            state,
                            postal_code,
                            country,
                            rh.id hours_id,
                            monday,
                            tuesday,
                            wednesday,
                            thursday,
                            friday,
                            saturday,
                            sunday,
                            menu_description,
                            path_to_menu,
                            menu_web_link
                     FROM restaurants
                              LEFT JOIN restaurant_locations rl on restaurants.location_ID = rl.id
                              LEFT JOIN restaurant_hours rh on restaurants.restaurant_hours = rh.id
                              LEFT JOIN restaurant_menus rm on restaurants.menu_ID = rm.id
                     WHERE restaurants.id = ?`;

    console.log(`ID TO GET IS: ${restaurantID}`)
    conn.query(sql_query, restaurantID, (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            if (res.length > 0) {
                results(null, new Restaurant(res[0]))
            } else {
                results(null, res); //no results, return res and length will be 0
            }
        }
    })
}

Restaurant.get_restaurant_by_id_with_reservations = (restaurantID, results) => {
    let getRestaurantQuery = `SELECT restaurants.id,
                                     restaurant_name,
                                     restaurant_description,
                                     restaurant_phone_number,
                                     star_rating,
                                     rl.id location_id,
                                     location_name,
                                     address1,
                                     address2,
                                     city,
                                     state,
                                     postal_code,
                                     country,
                                     rh.id hours_id,
                                     monday,
                                     tuesday,
                                     wednesday,
                                     thursday,
                                     friday,
                                     saturday,
                                     sunday,
                                     menu_description,
                                     path_to_menu,
                                     menu_web_link
                              FROM restaurants
                                       LEFT JOIN restaurant_locations rl on restaurants.location_ID = rl.id
                                       LEFT JOIN restaurant_hours rh on restaurants.restaurant_hours = rh.id
                                       LEFT JOIN restaurant_menus rm on restaurants.menu_ID = rm.id
                              WHERE restaurants.id = ?`;
    let getReservationsQuery = `SELECT reservation_date,
                                       reservation_time,
                                       purpose,
                                       reservation_status,
                                       username,
                                       first_name,
                                       last_name,
                                       email_address,
                                       phone_number
                                FROM restaurant_reservations
                                         INNER JOIN users u on restaurant_reservations.userID = u.id
                                WHERE restaurantID = ?`;

    conn.query(getRestaurantQuery, restaurantID, (err, restaurantRes) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else if (restaurantRes.length > 0) {
            //only execute second query (get reservations) if we get a result from the first meaning we found a restaurant with the specified ID
            conn.query(getReservationsQuery, restaurantID, (err, reservationsRes) => {
                if (err) {
                    console.log(err);
                    results(err, null);
                } else {
                    const restaurant = new Restaurant(restaurantRes[0]);
                    restaurant.reservations = reservationsRes;
                    results(null, restaurant);
                }
            })
        } else {
            // We end up here if we didn't find a restaurant with the given ID
            results(null, restaurantRes)
        }
    })
}

// fixme: same issue as controller with differing ids
Restaurant.update_by_id = (idToUpdate, updatedInfo, results) => {
    const updateRestaurantMainInformation = `UPDATE restaurants
                                             SET restaurant_name         = ?,
                                                 restaurant_description  = ?,
                                                 restaurant_phone_number = ?,
                                                 star_rating = ?
                                             WHERE id = ?`;
    const updateRestaurantLocation = `UPDATE restaurant_locations
                                      SET location_name = ?,
                                          address1      = ?,
                                          address2      = ?,
                                          city          = ?,
                                          state         = ?,
                                          postal_code   = ?,
                                          country       = ?
                                      WHERE id = ?`;
    const updateRestaurantHours = `UPDATE restaurant_hours
                                   SET monday    = ?,
                                       tuesday   = ?,
                                       wednesday = ?,
                                       thursday  = ?,
                                       friday    = ?,
                                       saturday  = ?,
                                       sunday    = ?
                                   WHERE id = ?`;

}

Restaurant.create_new_restaurant = (restaurantInfo, results) => {
    console.log(`restaurantInfo: ${JSON.stringify(restaurantInfo)}`);

    //insert into restaurant_locations
    let insertRestaurantLocation = `INSERT INTO restaurant_locations (location_name, address1, address2, city, state, postal_code, country)
                                    VALUES (?, ?, ?, ?, ?, ?, ?)`;
    //insert into restaurant_hours
    let insertRestaurantHours = `INSERT INTO restaurant_hours (monday, tuesday, wednesday, thursday, friday, saturday, sunday)
                                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    //insert into restaurants
    let insertRestaurant = `INSERT INTO restaurants (restaurant_name, restaurant_description, restaurant_phone_number, star_rating,
                                                     restaurant_hours, location_ID, menu_ID)
                            VALUES (?, ?, ?, ?, ?, ?, ?)`;

    conn.query(insertRestaurantLocation, [restaurantInfo.location.location_name, restaurantInfo.location.address1, restaurantInfo.location.address2, restaurantInfo.location.city, restaurantInfo.location.state, restaurantInfo.location.postal_code, restaurantInfo.location.country], (err, locationRes) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            conn.query(insertRestaurantHours, [restaurantInfo.hours.monday, restaurantInfo.hours.tuesday, restaurantInfo.hours.wednesday, restaurantInfo.hours.thursday, restaurantInfo.hours.friday, restaurantInfo.hours.saturday, restaurantInfo.hours.sunday], (err, hoursRes) => {
                if (err) {
                    console.log(err);
                    results(err, null);
                } else {
                    conn.query(insertRestaurant, [restaurantInfo.restaurant_name, restaurantInfo.restaurant_description, restaurantInfo.restaurant_phone_number, hoursRes.insertId, locationRes.insertId, restaurantInfo.menu], (err, restaurantInfoRes) => {
                        if (err) {
                            console.log(err);
                            results(err, null);
                        } else {
                            results(null, restaurantInfoRes);
                        }
                    })
                }
            })
        }
    })
}

Restaurant.search_by_key_term = (searchTerms, results) => {
    // deconstruct the searchTerms into its various search components
    const [restaurantName, description, phoneNumber, address, city, state] = searchTerms;

    // language=SQL format=false
    let sql_query = `select restaurants.id, restaurant_name, restaurant_description, restaurant_phone_number, 
                    location_name, address1, address2, city, state, postal_code, country,
                    monday, tuesday, wednesday, thursday, friday, saturday, sunday
                    from restaurants
                    left join restaurant_locations rl on restaurants.location_ID = rl.id
                    LEFT JOIN restaurant_hours rh on restaurants.restaurant_hours = rh.id
                    where 
                    restaurant_name LIKE "%"?"%" OR restaurant_description LIKE "%"?"%" OR restaurant_phone_number LIKE "%"?"%" OR
                    address1 LIKE "%"?"%" OR city LIKE "%"?"%" OR state LIKE "%"?"%"`;

    conn.query(sql_query, [restaurantName, description, phoneNumber, address, city, state], (err, res) => {
        if (err) {
            console.log(err);
            results(err, null)
        } else {
            const restaurants = [];

            // convert raw SQL response to Restaurant objects
            res.forEach((item) => {
                restaurants.push(new Restaurant(item))
            })

            results(null, restaurants);
        }
    })

}


module.exports = Restaurant;