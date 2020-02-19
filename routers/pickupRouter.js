const express = require('express');
const pickupRouter = express.Router();
const dbHelper = require('../data/dbHelper');
const {isEmpty} = require('../utils/utilities');

pickupRouter.get('/', (req,res) => {
    dbHelper.getAll('pickups')
    .then(pickups => res.status(200).json(pickups))
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.get('/:restID', (req,res) => {
    const {restID} = req.params;
    dbHelper.getPickups('pickups', restID)
    .then( pickups => {
        res.status(200).json(pickups);
    })
    .catch(err => res.status(500).json(err.message))
})

pickupRouter.get('/:restID/:volID', async (req,res) => {
    const idObj = req.params;
    
    dbHelper.getById('pickups',idObj)
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
    //requires a restaurant_id on the requesst body.  if no volunteer_id, value of null assigned.
    const {food,quantity,restaurant_id,volunteer_id} = req.body;
    if (!food) {
        res.status(400).send('food is a required field.');
        return;
    } 
    if (!quantity) {
        res.status(400).send('quantity not specified');
        return;
    }
    if (!restaurant_id) {
        res.status(400).send('restaurant_id is a required field.');
        return;
    } if (!volunteer_id) {
        res.status(400).send('volunteer_id is a required field.');
        return;
    }

    const newPickup = req.body;
    console.log(newPickup)

    dbHelper.add('pickups', newPickup)
    .then(([pickup]) => {
        console.log('pickup', pickup);
        res.status(201).json(pickup);
    })
    .catch(err => {
        console.log('pickup adding error', err.message);
        res.status(500).json(err.message);
    });
})

pickupRouter.put('/', async (req,res) => {
    const idObj = {restID : req.body.restaurant_id, volID: req.body.volunteer_id}
    const modPick = req.body;

    if (!req.body.restaurant_id) {
        res.status(400).json({missing : "please provide a valide restaurant_id on the request object..."})
        return;
    }

    dbHelper.modify('pickups',idObj,modPick)
    .then((pick) => {
        console.log(pick, "modded pickup");
        if (pick) {
            res.status(202).json(pick[0]);
        } else {
            res.status(404).json({missing : `could not modify pickup with restaurant_id ${idObj.restID} and volunteer_id ${idObj.volID}.  One of ids do not exist in the database.  Not found....`})
        }
    })
    .catch(err => {
        console.log(err.message);
        res.status(500).json({missing: `could not update pickup. restaurant_id of ${idObj.restID} or volunteer_id of ${idObj.volID} not in database.`,database_error : err.message})
    })
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

pickupRouter.delete('/:restID', (req,res) => {
    const {restID} = req.params;

    dbHelper.remove('pickups', restID)
    .then(del => res.status(202).json({deleted : `${del} records associated with restaurant ${restID} were deleted from the database`}))
    .catch(err => res.status(500).json(err.message))
})


module.exports = pickupRouter;

