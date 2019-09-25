const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('restaurants').insert([
        {id: 1, restaurant_name: 'Bread and Kabob', username: 'bk', password: bcrypt.hashSync('pass', 10)},
        {id: 2, restaurant_name: 'Pizza Hut', username: "pizzahut", password: bcrypt.hashSync('pass', 10)},
        {id: 3, restaurant_name: 'Applebees', username: "applebees", password: bcrypt.hashSync('pass', 10)}
      ]);
};


