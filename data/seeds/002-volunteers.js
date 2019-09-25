const bcrypt = require('bcryptjs');

exports.seed = function(knex) {
  // Deletes ALL existing entries
      return knex('volunteers').insert([
        {id: 1, volunteer_name: 'volunteer1', phone: '888-888-8888', email: 'vol@email.com', username: "vol1", password: bcrypt.hashSync('pass', 10)},
        {id: 2, volunteer_name: 'volunteer2', phone: '777-888-7777', email: 'vol2@email.com', username: "vol2", password: bcrypt.hashSync('pass', 10)},
        {id: 3, volunteer_name: 'volunteer3', phone: '666-888-6666', email: 'vol3@email.com', username: "vol3", password: bcrypt.hashSync('pass', 10)}
      ]);
};
