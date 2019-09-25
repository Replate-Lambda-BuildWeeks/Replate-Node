const express = require('express');
const locationRouter = require('./routers/locationRouter');
const nonProfitRouter = require('./routers/nonprofitRouter');
const pickupRouter = require('./routers/pickupRouter');
const restaurantRouter = require('./routers/restaurantRouter');
const volunteerRouter = require('./routers/volunteerRouter');
const authRouter = require('./routers/authRouter');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/locations', locationRouter);
server.use('/nonprofits', nonProfitRouter);
server.use('/pickups', pickupRouter);
server.use('/restaurants', restaurantRouter);
server.use('/volunteers', volunteerRouter);
server.use('/auth', authRouter);

server.get('/', (req,res) => {
    res.send('<h1>Welcome to the rePlate API server.');
});

module.exports = server;

