
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', tbl => {
        tbl.increments()
        tbl.string('restaurant_name',128).notNullable().unique();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('restaurants');
};



