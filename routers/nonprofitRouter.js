const express = require('express');
const nonprofitRouter = express.Router();
const dbHelper = require('../data/dbHelper');

nonprofitRouter.get('/', (req,res) => {
    dbHelper.getAll('nonprofits')
    .then(nonprofits => {
        res.status(200).json(nonprofits);
    })
    .catch(err => res.status(500).json(err.message))
})


module.exports = nonprofitRouter;

