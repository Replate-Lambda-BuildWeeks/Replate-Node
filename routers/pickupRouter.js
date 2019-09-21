const express = require('express');
const pickupRouter = express.Router();
const dbHelper = require('../data/dbHelper');

pickupRouter.get('/', (req,res) => {
    dbHelper.getAll('pickups')
    .then(pickups => res.status(200).json(pickups))
    .catch(err => res.status(500).json(err.message))
})

module.exports = pickupRouter;

