
exports.seed = function(knex) {
      return knex('pickups').insert([
        {food: 'chicken', quantity: '3 lbs', date: '01-01-2099', time: '12:00 pm', volunteer_id : 1, restaurant_id: 1, nonprofit_id: 1, location_id: 1},
        {food: 'beef', quantity: '3 lbs', date: '01-01-2020', time: '12:00 pm', volunteer_id : 2, restaurant_id: 1, nonprofit_id: 1, location_id: 1},
        {food: 'bread', quantity: '20 naans', date: '12-12-2020', time: '12:00 pm', volunteer_id : 3, restaurant_id: 1, nonprofit_id: 1, location_id: 1}
      ]);
};
