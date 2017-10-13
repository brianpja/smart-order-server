
exports.up = function(knex, Promise) {
  return knex.schema.createTable('distributors', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('contact');
    table.string('email').notNullable();
    table.timestamp('deleted_at').defaultTo(null);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('distributors');
};
