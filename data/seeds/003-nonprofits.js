
exports.seed = function(knex) {
      return knex('nonprofits').insert([
        {id: 1, nonprofit_name: 'EPIC'},
        {id: 2, nonprofit_name: 'Islamic Relief'},
        {id: 3, nonprofit_name: 'Unicef'}
      ]);
    };
