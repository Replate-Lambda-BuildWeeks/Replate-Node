const express = require('express');
const locationRouter = express.Router();
const dbHelper = require('../data/dbHelper');

locationRouter.get('/', (req,res) => {
    dbHelper.getAll('locations')
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(500).json(err.message))
})

module.exports = locationRouter;