const knex = require('knex');
const knexfile = require('../knexfile');
const secrets = require('../secrets/secrets');

// const db = knex(knexfile[secrets.nodeEnv]);
const environment = process.env.DB_ENV || 'development';
const db = knex(knexfile[environment]);

module.exports = db;

