'use strict';
const conn = require('./db');

const RestaurantHours = function (hoursInfo) {
    this.id = hoursInfo.id;
    this.monday = hoursInfo.monday;
    this.tuesday = hoursInfo.tuesday;
    this.wednesday = hoursInfo.wednesday;
    this.thursday = hoursInfo.thursday;
    this.friday = hoursInfo.friday;
    this.saturday = hoursInfo.saturday;
    this.sunday = hoursInfo.sunday;
}

RestaurantHours.get_hours_by_restaurant_id = function (restaurantID, results) {
    let hours_sql = `select rh.id AS id,
                            rh.monday,
                            rh.tuesday,
                            rh.wednesday,
                            rh.thursday,
                            rh.friday,
                            rh.saturday,
                            rh.sunday
                     from restaurants rst
                              join restaurant_hours rh on rst.restaurant_hours = rh.id
                     where rst.id = ?;`;

    conn.query(hours_sql, restaurantID, (err, result) => {
        if (err) {
            results(err, null);
        } else {
            if(result.length > 0) {
                results(null, new RestaurantHours(result[0]));
            } else {
                results(true, null);
            }

        }
    });

}

module.exports = RestaurantHours;