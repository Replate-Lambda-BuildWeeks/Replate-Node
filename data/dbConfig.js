const knex = require('knex');
const knexfile = require('../knexfile');
const secrets = require('../secrets/secrets');

// const db = knex(knexfile[secrets.nodeEnv]);
const db = knex(knexfile['testing']);

module.exports = db;

