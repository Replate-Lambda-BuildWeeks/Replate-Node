
exports.up = function(knex) {
  return knex.schema.createTable('locations', tbl => {
      tbl.increments();
      tbl.string('location', 128).notNullable().unique();
      tbl.integer('restaurant_id').unsigned().references('id').inTable('restaurants')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('locations');
};
