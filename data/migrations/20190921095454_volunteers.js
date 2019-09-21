
exports.up = function(knex) {
  return knex.schema.createTable('volunteers', tbl => {
      tbl.increments();
      tbl.string('volunteer',32).notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('volunteers');
};


