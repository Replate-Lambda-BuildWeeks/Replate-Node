const knex = require('knex');
const knexfile = require('../knexfile');
const secrets = require('../secrets/secrets');
const environment = secrets.nodeEnv || 'development';

console.log('node env: ', secrets.nodeEnv);

const db = knex(knexfile['production']);

module.exports = db;

