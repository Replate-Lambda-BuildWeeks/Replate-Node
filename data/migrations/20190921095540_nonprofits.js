
exports.up = function(knex) {
  return knex.schema.createTable('nonprofits', tbl => {
      tbl.increments();
      tbl.string('nonprofit_name', 128).notNullable().unique();
  })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('nonprofits');
};


