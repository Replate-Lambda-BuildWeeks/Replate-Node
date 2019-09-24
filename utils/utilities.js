
const jwt = require('jsonwebtoken');
const secrets = require('../secrets/secrets');

console.log(secrets);



function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
}

function createJWT(user) {
    const payload = {
        user : user
    }

    const secret = secrets.jwt_secret;

    const options = {
        expiresIn : '1h'
    }

    return jwt.sign(payload, secret, options)
}

function authenticate(req,res,next) {
    // if (!req.body.usrname || !req.body.password) {
    //     res.send('username or password missing. please send one over');
    // }

    if (!req.headers.authorization) {
        res.send('please send the JWT on the authorization key of the headers of the request object');
    }

    const token = req.headers.authorization;

    const creds = {username : req.body.username, password : req.body.password};

    jwt.verify(token, secrets.jwt_secret, (err,decodedToken) => {
        if (err) {
            res.status(403).json({unauthorized: 'you are not an authorized user'})
        } else {
            console.log('decoded token', decodedToken)
            req.user = decodedToken.user;
            next();
        }
    })
}

module.exports = {
    isEmpty,
    createJWT,
    authenticate
}

