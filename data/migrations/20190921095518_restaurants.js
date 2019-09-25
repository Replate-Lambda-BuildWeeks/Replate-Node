
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', tbl => {
        tbl.increments()
        tbl.string('restaurant_name',128).notNullable().unique();
        tbl.string('username', 32).notNullable().unique();
        tbl.string('password', 128).notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('restaurants');
};



