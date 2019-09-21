const express = require('express');
const restaurantRouter = express.Router();
const dbHelper = require('../data/dbHelper');

restaurantRouter.get('/', (req,res) => {
    dbHelper.getAll('restaurants')
    .then(restaurants => res.status(200).json(restaurants))
    .catch(err => res.status(500).json(err.message));
})


module.exports = restaurantRouter;