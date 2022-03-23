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
    let sql_query = `SELECT restaurants.id, restaurant_name, restaurant_description, restaurant_phone_number,
                    location_name, address1, address2, city, state, postal_code, country,
                    monday, tuesday, wednesday, thursday, friday, saturday, sunday,
                    menu_description, path_to_menu, menu_web_link
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
    let sql_query = `SELECT restaurants.id, restaurant_name, restaurant_description, restaurant_phone_number,
                    location_name, address1, address2, city, state, postal_code, country,
                    monday, tuesday, wednesday, thursday, friday, saturday, sunday,
                    menu_description, path_to_menu, menu_web_link
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
                // fix this later (just sent true as the error and catch it in controller)
                results(true, null);
            }
        }
    })
}

Restaurant.update_by_id = () => {

}

Restaurant.search_by_key_term = (searchTerms, results) => {
    // deconstruct the searchTerms into its various search components
    const [restaurantName, description, phoneNumber, address, city, state] = searchTerms;

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