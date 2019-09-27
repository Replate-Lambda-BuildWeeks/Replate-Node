
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', tbl => {
        tbl.increments()
        tbl.string('restaurant_name',128).notNullable().unique();
        tbl.string('contact',32);
        tbl.string('address', 128);
        tbl.string('city', 32);
        tbl.string('zip', 9);
        tbl.string('phone',10);
        tbl.string('email',32);
        tbl.string('username', 32).notNullable().unique();
        tbl.string('password').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('restaurants');
};



