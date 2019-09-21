const express = require('express');
const volunteerRouter = express.Router();
const dbHelper = require('../data/dbHelper');


volunteerRouter.get('/', (req,res) => {
    dbHelper.getAll('volunteers')
    .then(volunteers => res.status(200).json(volunteers))
    .catch(err => res.status(500).json(err.message))
})

module.exports = volunteerRouter;

