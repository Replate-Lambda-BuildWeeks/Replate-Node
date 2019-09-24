const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('users').insert([
        {id: 1, username: 'user1', password: bcrypt.hashSync('pass', 10)},
        {id: 2, username: 'user2', password: bcrypt.hashSync('pass', 10)},
        {id: 3, username: 'user3', password: bcrypt.hashSync('pass', 10)}
      ]);
};

