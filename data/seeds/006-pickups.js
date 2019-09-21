
exports.seed = function(knex) {
      return knex('pickups').insert([
        {food: 'chicken', quantity: '3 lbs', volunteer_id : 1, restaurant_id: 1, nonprofit_id: 1, location_id: 1},
        {food: 'beef', quantity: '3 lbs', volunteer_id : 2, restaurant_id: 1, nonprofit_id: 1, location_id: 1},
        {food: 'bread', quantity: '20 naans', volunteer_id : 3, restaurant_id: 1, nonprofit_id: 1, location_id: 1}
      ]);
};
