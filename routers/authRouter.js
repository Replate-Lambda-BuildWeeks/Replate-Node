const express = require('express');
const dbHelper = require('../data/dbHelper');
const {createJWT, authenticate} = require('../utils/utilities');
// const bcrypt = require('bcryptjs');

const authRouter = express.Router();

authRouter.get('/', (req,res) => {
    res.send('welcome to the auth router.  You can /login or /register. Be ready to receive a JSON Web Token (JWT) and store it in local storage.  When you logout, be sure to delete the JWT from local storage.');
})

authRouter.get('/users', authenticate, (req,res) => {
    dbHelper.getAll('users')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json(err.message))
})

authRouter.post('/register', (req,res) => {
    const creds = req.body;
    if (!creds.username || !creds.password) {
        res.status(400).json({missing : 'please send over a username and password'})
    }

    creds.password = bcrypt.hashSync(creds.password,10);

    dbHelper.add('users',creds)
    .then(user => {
        const token = createJWT(user);
        user.token = token;
        res.status(201).json(user);
    })
    .catch(err => res.status(500).json(err.message));
})

authRouter.post('/login', (req,res) => {
    const creds = req.body;
    if (!creds.username || !creds.password) {
        res.status(400).json({missing : 'please send over a username and password'})
    }

    dbHelper.login(creds)
    .then((user) => {
        if (user) {
            const token =  createJWT(user);
            user.token = token;
             res.status(202).json(user);
        } else {
            res.status(403).json({unauthorized: `${creds.username} has invalid credentials...`})
        }
    })
    .catch(err => res.status(500).json(err.message))
})

module.exports = authRouter;


