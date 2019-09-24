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
    const idObj = req.params;
    dbHelper.getOne('pickups',idObj)
    .then(([pickup]) => {
        if (isEmpty(pickup)) {
            res.status(404).json({missing: `no pickup with combination of restaurant_id ${idObj.restID} and volunteer_id ${idObj.volID} found in the database....`})
        } else {
            res.status(200).json(pickup);
        }
    })
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.post('/', (req,res) => {
    const newPickup = req.body;

    dbHelper.add('pickups', newPickup)
    .then(pickup => {
        console.log('pickup', pickup);
        res.status(201).json(pickup);
    })
    .catch(err => {
        console.log('pickup adding error', err.message);
        res.status(500).json(err.message);
    });
})

pickupRouter.put('/', (req,res) => {
    const idObj = {restID : req.body.restaurant_id, volID: req.body.volunteer_id}
    const modPick = req.body;

    dbHelper.modify('pickups',idObj,modPick)
    .then(([pick]) => {
        console.log(pick);
        res.status(202).json(pick)
    })
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.delete('/:restID/:volID', (req,res) => {
    const idObj = req.params;
    dbHelper.remove('pickups', idObj)
    .then( one => {
        if (one) {
            res.status(200).json({deleted : `pickup with restaurant id ${idObj.restID} and volunteer_id ${idObj.volID} deleted... `});
        } else {
            res.status(404).json({missing : `pickup with restaurant id ${idObj.restID} and volunteer_id ${idObj.volID} not found in the database...`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})


module.exports = pickupRouter;

