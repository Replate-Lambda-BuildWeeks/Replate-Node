const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
      return knex('volunteers').insert([
        {id: 1, volunteer_name: 'volunteer1', username: "vol1", password: bcrypt.hashSync('pass', 10)},
        {id: 2, volunteer_name: 'volunteer2', username: "vol2", password: bcrypt.hashSync('pass', 10)},
        {id: 3, volunteer_name: 'volunteer3', username: "vol3", password: bcrypt.hashSync('pass', 10)}
      ]);
};
