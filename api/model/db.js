const sql = require('mysql');

const dbConnection = sql.createConnection({
    host: process.env.AU_SQL_DB_HOST,
    user: process.env.AU_SQL_DB_USER,
    password: process.env.AU_SQL_DB_PASSWORD,
    database: process.env.AU_SQL_DB_DATABASE,
});

dbConnection.connect((err) => {
    if (err) throw err;

})

module.exports = dbConnection;
