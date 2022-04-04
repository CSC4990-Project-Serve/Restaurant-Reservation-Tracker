const sql = require('mysql2');

let dbConnection;

if (process.env.NODE_ENV === "development") {
     dbConnection = sql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'csc4990_project_serve',
    });
} else if (process.env.NODE_ENV === "production") {
    dbConnection = sql.createConnection({
        host: process.env.AU_SQL_DB_HOST,
        user: process.env.AU_SQL_DB_USER,
        password: process.env.AU_SQL_DB_PASSWORD,
        database: process.env.AU_SQL_DB_DATABASE,
    });
} else {
    throw "Error: No environment specified in .env file!";
}

dbConnection.connect((err) => {
    if (err) throw err
    else console.log(`SQL DB Connection Success (Running in: ${process.env.NODE_ENV} mode)`);
})

module.exports = dbConnection;
