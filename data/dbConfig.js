const knex = require('knex');
const knexfile = require('../knexfile');
const environment = secrets.nodeEnv || 'development';
const db = knex(knexfile[environment]);

module.exports = db;

