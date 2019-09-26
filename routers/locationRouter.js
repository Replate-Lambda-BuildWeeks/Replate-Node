const express = require('express');
const locationRouter = express.Router();
const dbHelper = require('../data/dbHelper');
const {isEmpty} = require('../utils/utilities')

locationRouter.get('/', (req,res) => {
    dbHelper.getAll('locations')
    .then(locations => res.status(200).json(locations))
    .catch(err => res.status(500).json(err.message))
})

locationRouter.get('/:id', (req,res) => {
    const id = req.params.id;
    dbHelper.getById('locations',id)
    .then(location => {
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({missing: `location with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

locationRouter.post('/', (req,res) => {
    const newLoc = req.body;
    if (isEmpty(newLoc)) {
        res.status(400).json({error: 'missing location data.  location must be provided'})
    }
    dbHelper.add('locations', newLoc)
    .then((location) => {
        res.status(201).json(location);
    })
    .catch(err => res.status(500).json(err.message))
})

locationRouter.put('/:id', (req,res) => {
    const id = req.params.id;
    const modLoc = req.body;

    if (isEmpty(modLoc)) {
        res.status(400).json({error : 'not sending any location data to modify.'})
    }

    dbHelper.modify('locations', id, modLoc)
    .then(location => {
        console.log(location);
        if (location) {
            res.status(200).json(location);
        } else {
            res.status(404).json({missing : `location with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message));
})

locationRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.remove('locations',req.params.id)
    .then(() => res.status(202).json({deleted: `location with id ${id} has been deleted.`}))
    .catch(err => res.status(500).json(err.message))
})

module.exports = locationRouter;