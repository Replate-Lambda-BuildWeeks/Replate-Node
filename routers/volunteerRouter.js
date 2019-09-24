const express = require('express');
const volunteerRouter = express.Router();
const dbHelper = require('../data/dbHelper');

volunteerRouter.get('/', (req,res) => {
    dbHelper.getAll('volunteers')
    .then(volunteers => res.status(200).json(volunteers))
    .catch(err => res.status(500).json(err.message))
})

volunteerRouter.get('/:id', (req,res) => {
    const {id} = req.params;

    dbHelper.getOne('volunteers',id)
    .then(vol => {
        if (vol) {
            res.status(200).json(vol);
        } else {
            res.status(404).json({missing: `volunteer with id ${id} not found in the database...`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

volunteerRouter.post('/', (req,res) => {
    const newVol = req.body;
    dbHelper.add('volunteers', newVol)
    .then(vol => res.status(201).json(vol))
    .catch(err => res.status(500).json(err.message))
})

volunteerRouter.put('/:id', (req,res) => {
    const modVol = req.body;
    const {id} = req.params;

    dbHelper.modify('volunteers',id,modVol)
    .then(vol => {
        if (vol) {
            res.status(201).json(vol);
        } else {
            res.status(404).json({missing : `volunteer with id ${id} not found in the databae`})
        }
    })
    .catch(err => res.status(500).json(err.message));
})

volunteerRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.remove('volunteers', id)
    .then( one => {
        if (one) {
            res.status(202).json({deleted : `volunteer with id ${id} deleted from the database`})
        } else {
            res.status(404).json({missing: `volunteer with id ${id} not found in the database`});
        }
    })
    .catch(err => res.status(500).json(err.message))

})



module.exports = volunteerRouter;

