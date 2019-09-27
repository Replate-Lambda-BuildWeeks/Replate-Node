
exports.up = function(knex) {
    return knex.schema.createTable('restaurants', tbl => {
        tbl.increments()
        tbl.text('restaurant_name',128).notNullable().unique();
        tbl.text('contact',32);
        tbl.text('address', 128);
        tbl.text('city', 32);
        tbl.text('zip', 9);
        tbl.text('phone',10);
        tbl.text('email',32);
        tbl.text('username', 32).notNullable().unique();
        tbl.text('password').notNullable();
    })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('restaurants');
};



