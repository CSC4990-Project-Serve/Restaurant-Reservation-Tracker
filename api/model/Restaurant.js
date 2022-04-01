'use strict';

const conn = require('./db');

const Restaurant = function (restaurantInfo) {
    this.id = restaurantInfo.id;
    this.restaurant_name = restaurantInfo.restaurant_name;
    this.restaurant_description = restaurantInfo.restaurant_description;
    this.restaurant_phone_number = restaurantInfo.restaurant_phone_number;
    this.location = {
        location_name: restaurantInfo.location_name,
        address1: restaurantInfo.address1,
        address2: restaurantInfo.address2,
        city: restaurantInfo.city,
        state: restaurantInfo.state,
        postal_code: restaurantInfo.postal_code,
        country: restaurantInfo.country,
    };
    this.hours = {
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
}

Restaurant.get_all_restaurants_from_db = (results) => {
    let sql_query = `SELECT restaurants.id,
                            restaurant_name,
                            restaurant_description,
                            restaurant_phone_number,
                            location_name,
                            address1,
                            address2,
                            city,
                            state,
                            postal_code,
                            country,
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
                            location_name,
                            address1,
                            address2,
                            city,
                            state,
                            postal_code,
                            country,
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

Restaurant.update_by_id = (idToUpdate, updatedInfo, results) => {
    let updateRestaurantInformation = `UPDATE restaurants
                                       SET restaurant_name         = ?,
                                           restaurant_description  = ?,
                                           restaurant_phone_number = ?
                                       WHERE id = ?`;
    let updateRestaurantLocation = `UPDATE restaurant_locations
                                    SET location_name = ?,
                                        address1      = ?,
                                        address2      = ?,
                                        city          = ?,
                                        state         = ?,
                                        postal_code   = ?,
                                        country       = ?
                                    WHERE id = ?`;
    let updateRestaurantHours = `UPDATE restaurant_hours
                                 SET monday    = ?,
                                     tuesday   = ?,
                                     wednesday = ?,
                                     thursday  = ?,
                                     friday    = ?,
                                     saturday  = ?,
                                     sunday    = ?
                                 WHERE id = ?`;

    conn.query(updateRestaurantInformation, [updatedInfo.restaurant_name, updatedInfo.restaurant_description, updatedInfo.restaurant_phone_number, idToUpdate], (err, res) => {
        if (err) {
            console.log(err);
            results(err, null);
        } else {
            conn.query(updateRestaurantLocation, [updatedInfo.location_name, updatedInfo.address1, updatedInfo.address2, updatedInfo.city, updatedInfo.state, updatedInfo.postal_code, updatedInfo.country, idToUpdate], (err, res) => {
                if (err) {
                    console.log(err);
                    results(err, null);
                } else {
                    conn.query(updateRestaurantHours, [updatedInfo.monday, updatedInfo.tuesday, updatedInfo.wednesday, updatedInfo.thursday, updatedInfo.friday, updatedInfo.saturday, updatedInfo.sunday, idToUpdate], (err, res) => {
                        if (err) {
                            console.log(err);
                            results(err, null);
                        } else {
                            results(null, res);
                        }
                    })
                }
            })
        }
    })
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
    let insertRestaurant = `INSERT INTO restaurants (restaurant_name, restaurant_description, restaurant_phone_number,
                                                     restaurant_hours, location_ID, menu_ID)
                            VALUES (?, ?, ?, ?, ?, ?)`;

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