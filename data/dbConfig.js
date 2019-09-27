const knex = require('knex');
const knexfile = require('../knexfile');
const secrets = require('../secrets/secrets');
require('dotenv').config();

// const db = knex(knexfile[secrets.nodeEnv]);
// || 'development';

//NODE_ENV is automatically recognized by heroku to be set to production.

const environment = process.env.DB_ENV;
const db = knex(knexfile[environment]);

module.exports = db;
