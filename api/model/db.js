const sql = require('mysql2');

let dbConnection;

if (process.env.NODE_ENV === "development") {
    dbConnection = sql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'csc4990_project_serve',
        connectionLimit: 1,
    });
} else if (process.env.NODE_ENV === "production") {
    dbConnection = sql.createPool({
        host: process.env.AU_SQL_DB_HOST,
        user: process.env.AU_SQL_DB_USER,
        password: process.env.AU_SQL_DB_PASSWORD,
        database: process.env.AU_SQL_DB_DATABASE,
        connectionLimit: 1,
    });
} else {
    throw "Error: No environment specified in .env file!";
}

dbConnection.getConnection((err, connection) => {
    if (err) {
        throw err;
    } else {
        console.log(`SQL DB Connection Pool Success (Running in: ${process.env.NODE_ENV} mode)`);
        connection.release();
    }
})

module.exports = dbConnection;
