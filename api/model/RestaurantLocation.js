'use strict';
const conn = require('./db');

const RestaurantLocation= function (locationInfo) {
    this.id = locationInfo.id;
    this.location_name = locationInfo.location_name;
    this.address1 = locationInfo.address1;
    this.address2 = locationInfo.address2;
    this.city = locationInfo.city;
    this.state = locationInfo.state;
    this.postal_code = locationInfo.postal_code;
    this.country = locationInfo.country;
}

RestaurantLocation.get_location_by_restaurant_id = function (restaurantID, results) {
    let location_sql = `select rl.id as id,
                               rl.location_name,
                               rl.address1,
                               rl.address2,
                               rl.city,
                               rl.state,
                               rl.postal_code,
                               rl.country
                        from restaurants rst
                                 join restaurant_locations rl on rl.id = rst.location_ID
                        where rst.id = ?`;

    conn.query(location_sql, restaurantID, (err, rows) => {
        if (err) {
            results(err, null);
        } else {
            if(rows.length > 0) {
                results(null, new RestaurantLocation(rows[0]));
            } else {
                results(true, null);
            }
        }
    });
}

module.exports = RestaurantLocation;