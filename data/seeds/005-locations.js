
exports.seed = function(knex) {
      return knex('locations').insert([
        {id: 1, location: 'dallas1', restaurant_id: 1},
        {id: 2, location: 'tampa', restaurant_id: 1},
        {id: 3, location: 'oklahoma city', restaurant_id: 1}
      ]);
};
