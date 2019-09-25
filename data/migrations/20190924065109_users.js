
exports.up = function(knex) {
 return knex.schema.createTable('users', tbl => {
    tbl.increments();
    tbl.string('username',32).unique().notNullable();
    tbl.string('password',128).notNullable();
    tbl.string('type',9).notNullable().defaultTo('volunteer');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};
