const express = require('express');
const restaurantRouter = express.Router();
const dbHelper = require('../data/dbHelper');

restaurantRouter.get('/', (req,res) => {
    dbHelper.getAll('restaurants')
    .then(restaurants => res.status(200).json(restaurants))
    .catch(err => res.status(500).json(err.message));
})

restaurantRouter.get('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.getOne('restaurants', id )
    .then(restaurant => res.status(201).json(restaurant))
    .catch(err => res.status(500).json(err.message));
})

restaurantRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.remove('restaurants', id)
    .then((one) => {
        if (one) {
            console.log('delete response', resp);
            res.status(202).json({deleted: `restaurant with id ${id} deleted`})
        } else {
            res.status(404).json({error : `restaurant with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message));
})


module.exports = restaurantRouter;