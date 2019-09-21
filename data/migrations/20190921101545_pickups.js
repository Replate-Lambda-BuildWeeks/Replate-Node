
exports.up = function(knex) {
  return knex.schema.createTable('pickups', tbl => {
      tbl.primary(['volunteer_id', 'restaurant_id']);
      tbl.string('food',128).notNullable();
      tbl.string('quantity',128).notNullable();
      tbl.integer('volunteer_id').unsigned().references('id').inTable('volunteers');
      tbl.integer('restaurant_id').unsigned().references('id').inTable('restaurants');
      tbl.integer('location_id').unsigned().references('id').inTable('locations');
      tbl.integer('nonprofit_id').unsigned().references('id').inTable('nonprofits');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pickups');
};