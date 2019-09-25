
exports.up = function(knex) {
  return knex.schema.createTable('volunteers', tbl => {
      tbl.increments();
      tbl.string('volunteer_name',32).notNullable();
      tbl.string('username', 32).notNullable().unique();
      tbl.string('password', 128).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('volunteers');
};


