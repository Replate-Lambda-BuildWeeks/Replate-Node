
exports.up = function(knex) {
  return knex.schema.createTable('locations', tbl => {
      tbl.increments();
      tbl.string('address',128).notNullable().unique();
      tbl.string('city', 32).notNullable();
      tbl.string('state',16).notNullable();
      tbl.string('zip', 10).notNullable();
      tbl.integer('restaurant_id').unsigned().references('id').inTable('restaurants').onDelete('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('locations');
};
