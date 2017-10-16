
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('name').notNullable().defaultTo('');
    table.string('company').notNullable();
    table.string('email').notNullable();
    table.string('hashed_password').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
