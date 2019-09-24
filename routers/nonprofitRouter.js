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

nonprofitRouter.get('/:id', (req,res) => {
    dbHelper.getOne('nonprofits', req.params.id)
    .then(nonprofit => {
        if (nonprofit) {
            res.status(200).json(nonprofit)
        } else {
            res.status(404).json({missing : `nonprofit with id ${req.params.id} not found in the database.`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

nonprofitRouter.post('/', (req,res) => {
    const newNonProf = req.body;
    if (!newNonProf.nonprofit_name) {
        res.status(400).json({invalid: `must send a nonprofit_name on the request object...`})
    } else {
        dbHelper.add('nonprofits', newNonProf)
    .then(nonprof => {
        res.status(200).json(nonprof);
    })
    .catch(err => res.status(500).json(err.message))
    }
})

nonprofitRouter.put('/:id', (req,res) => {
    const nonprof = req.body;
    if (!nonprof.nonprofit_name) {
        res.status(400).json({invalid : 'must send a nonprofit_name on the request object...'})
    } else {
        dbHelper.modify('nonprofits', req.params.id, nonprof)
        .then( moddedNonProfit => {
            if (moddedNonProfit) {
                res.status(202).json(moddedNonProfit);
            } else {
                res.status(404).json({missing : `nonprofit with id ${req.params.id} not found in the database.`})
            }
        })
        .catch(err => res.status(500).json(err.message));
    }
})

nonprofitRouter.delete('/:id', (req,res) => {
    const {id} = req.params;
    dbHelper.remove('nonprofits',id)
    .then(one => {
        if (one) {
            res.status(202).json({deleted: `nonprofit with id ${id} has been deleted.`})
        } else {
            res.status(404).json({missing : `nonprofit with id ${id} not found in the database`})
        }
        
    })
    .catch(err => res.status(500).json(err.message))
})









module.exports = nonprofitRouter;

