const express = require('express');
const pickupRouter = express.Router();
const dbHelper = require('../data/dbHelper');

pickupRouter.get('/', (req,res) => {
    dbHelper.getAll('pickups')
    .then(pickups => res.status(200).json(pickups))
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.get('/:restID/:volID', (req,res) => {
    console.log(req.params);
    const idObj = req.params;
    
    dbHelper.getOne('pickups',idObj)
    .then(pickup => {
        if (pickup) {
            res.status(200).json(pickup);
        } else {
            res.status(404).json({missing: `pickup with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = pickupRouter;

