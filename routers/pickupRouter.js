const express = require('express');
const pickupRouter = express.Router();
const dbHelper = require('../data/dbHelper');
const {isEmpty} = require('../utils/utilities');

pickupRouter.get('/', (req,res) => {
    dbHelper.getAll('pickups')
    .then(pickups => res.status(200).json(pickups))
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.get('/:restID/:volID', (req,res) => {
    console.log('in the pickup router single');
    const {idObj} = req.params;
    console.log(idObj);
    dbHelper.getOne('pickups',idObj)
    .then(([pickup]) => {
        console.log('pickup', pickup);
        console.log('isEmpty pickup', isEmpty(pickup));
        if (isEmpty(pickup)) {
            res.status(404).json({missing: `no pickup with restaurant_id ${idObj.restID} and volunteer_id ${idObj.volID} found in the database....`})
        } else {
            res.status(200).json(pickup);
        }
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = pickupRouter;

