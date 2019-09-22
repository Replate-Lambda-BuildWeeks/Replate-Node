const express = require('express');
const locationRouter = require('./routers/locationRouter');
const nonProfitRouter = require('./routers/nonprofitRouter');
const pickupRouter = require('./routers/pickupRouter');
const restaurantRouter = require('./routers/restaurantRouter');
const volunteerRouter = require('./routers/volunteerRouter');
const cors = require('cors');
const dbHelper = require('./data/dbHelper');

const server = express();

server.use(express.json());
server.use(cors());

server.use('/locations', locationRouter);
server.use('/nonprofits', nonProfitRouter);
server.use('/pickups', pickupRouter);
server.use('/restaurants', restaurantRouter);
server.use('/volunteers', volunteerRouter);

server.get('/', (req,res) => {
    res.send('<h1>Welcome to the rePlate API server.');
});

// server.delete('/restaurants/:id', (req,res) => {
//     dbHelper.remove('restaurants',req.params.id)
//     .then(() => res.status(204).json({deleted: `restaurant with id ${id} was deleted from the database`}))
//     .catch(err => res.status(500).json(err.message))
// })

module.exports = server;

