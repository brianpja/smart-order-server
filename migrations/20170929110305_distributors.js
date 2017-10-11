
exports.up = function(knex, Promise) {
  return knex.schema.createTable('distributors', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('contact');
    table.string('email').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('distributors');
};
