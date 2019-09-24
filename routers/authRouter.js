const express = require('express');
const dbHelper = require('../data/dbHelper');

const authRouter = express.Router();

authRouter.get('/', (req,res) => {
    res.send('welcome to the auth router.  You can /login or /register. Be ready to receive a JSON Web Token (JWT) and store it in local storage.  When you logout, be sure to delete the JWT from local storage.  We may attempt to use cookies.  If that is the case, ');
})


authRouter.post('/login', (req,res) => {

    const creds = req.body;
    dbHelper.login(creds)
    .then(user => {
        res.status(202).json(user)
    })
    .catch(err => res.status(500).json(err.message))
})





module.exports = authRouter;


