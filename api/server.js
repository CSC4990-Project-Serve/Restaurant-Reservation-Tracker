require('dotenv').config(); // api project's .env file for environment variables
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({origin: '*'}));

// routes definition
const userRoutes = require('./routes/users.routes');
userRoutes(app);


app.listen(port, () => {
    console.log(`API Server Started on port ${port}`)
});

module.exports = app;