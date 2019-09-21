
exports.seed = function(knex) {
      return knex('restaurants').insert([
        {id: 1, restaurant_name: 'Bread and Kabob'},
        {id: 2, restaurant_name: 'Pizza Hut'},
        {id: 3, restaurant_name: 'Applebees'}
      ]);
};


