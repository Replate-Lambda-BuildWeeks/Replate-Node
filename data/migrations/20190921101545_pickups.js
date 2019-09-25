
exports.up = function(knex) {
  return knex.schema.createTable('pickups', tbl => {
      tbl.primary(['volunteer_id', 'restaurant_id']);
      tbl.string('food',128).notNullable().unique();
      tbl.string('quantity',128).notNullable();
      tbl.integer('volunteer_id').unsigned().references('id').inTable('volunteers').onDelete('CASCADE');
      tbl.integer('restaurant_id').notNullable().unsigned().references('id').inTable('restaurants').onDelete('CASCADE');
      tbl.integer('location_id').unsigned().references('id').inTable('locations').onDelete('CASCADE');
      tbl.integer('nonprofit_id').unsigned().references('id').inTable('nonprofits').onDelete('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('pickups');
};