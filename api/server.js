require('dotenv').config(); // api project's .env file for environment variables
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit') // set up rate limiter: maximum of five requests per minute
const app = express();
const port = process.env.API_PORT || 5000;


const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors({origin: '*'}));

// routes definition
const userRoutes = require('./routes/users.routes');
const restaurantRoutes = require('./routes/restaurant.routes')
const reservationRoutes = require('./routes/reservation.routes');
userRoutes(app);
restaurantRoutes(app);
reservationRoutes(app);


app.listen(port, () => {
    console.log(`API Server Started on port ${port}`)
});

module.exports = app;