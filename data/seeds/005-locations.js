
exports.seed = function(knex) {
      return knex('locations').insert([
        {id: 1, address: '123 fun bus lane', city: "boston", state: "MA", zip: "12345", restaurant_id: 1},
        {id: 2, address: '999 churchill way', city: 'tampa', state: "FL", zip: "98765", restaurant_id: 1},
        {id: 3, address: '777 sirat pathway', city: 'makkah', state: "SA", zip: "77777", restaurant_id: 1},
      ]);
};
