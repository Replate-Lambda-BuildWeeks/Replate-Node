const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
      return knex('restaurants').insert([
        {id: 1, restaurant_name: 'Bread and Kabob', contact : 'suzie', address: '999 driver lane', city: 'madina', zip: "12345", phone: '123-456-7890', email: 'res@email.com', username: 'bk', password: bcrypt.hashSync('pass', 10)},
        {id: 2, restaurant_name: 'Pizza Hut', contact : 'jake',  address: '950 sirat way', city: 'makkah', zip: "12345", phone: '123-456-7890', email: 'res2@email.com', username: "pizzahut", password: bcrypt.hashSync('pass', 10)},
        {id: 3, restaurant_name: 'Applebees', contact : 'franchi', address: '666 highway blvd', city: 'jerusalem', zip: "12345", phone: '123-456-7890', email: 'res3@email.com', username: "applebees", password: bcrypt.hashSync('pass', 10)}
      ]);
};


