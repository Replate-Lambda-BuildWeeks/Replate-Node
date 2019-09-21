
exports.seed = function(knex) {
  // Deletes ALL existing entries
      return knex('volunteers').insert([
        {id: 1, volunteer: 'volunteer1'},
        {id: 2, volunteer: 'volunteer2'},
        {id: 3, volunteer: 'volunteer3'}
      ]);
};
