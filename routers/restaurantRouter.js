const express = require('express');
const restaurantRouter = express.Router();
const dbHelper = require('../data/dbHelper');

restaurantRouter.get('/', (req,res) => {
    dbHelper.getAll('restaurants')
    .then(restaurants => {
        restaurants.forEach(rest => {delete rest.password; delete rest.username});
        res.status(200).json(restaurants)
    })
    .catch(err => res.status(500).json(err.message));
})

restaurantRouter.get('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.getById('restaurants', id )
    .then(restaurant => {
        if (restaurant) {
            delete restaurant.password;
            res.status(201).json(restaurant)
        } else {
            res.status(404).json({missing: `restaurant with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message));
})

restaurantRouter.post('/', (req,res) => {
    const newRestaurant = req.body;
    const {username, password, restaurant_name} = newRestaurant;

    if (!username || !password || !restaurant_name) {
        res.status(400).json({missing: `a new restaurant must have a username, password, and restaurant_name field`})
    }
    dbHelper.add('restaurants', newRestaurant)
    .then(restaurant => {
        delete restaurant.username;
        delete restaurant.password;
        res.status(201).json(restaurant);
    })
    .catch(err => res.status(500).json(err.message))
})

restaurantRouter.put('/:id', (req,res) => {
    const modRest = req.body;
    const {id} = req.params;
    console.log(modRest);
    dbHelper.modify('restaurants', id, modRest)
    .then(rest => {
        delete rest.username;
        delete rest.password;
        res.status(201).json(rest);
    })
    .catch(err => res.status(500).json(err.message))
})

restaurantRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.remove('restaurants', id)
    .then((one) => {
        if (one) {
            console.log('delete response from database', one);
            res.status(202).json({deleted: `restaurant with id ${id} deleted`})
        } else {
            res.status(404).json({error : `restaurant with id ${id} not found in the database`})
        }
    })
    .catch(err => res.status(500).json(err.message));
})


module.exports = restaurantRouter;