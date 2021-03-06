
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (table) => {
    table.increments();
    table.integer('user_id').references('users.id').notNullable().onDelete('CASCADE')
    table.integer('distributor_id').references('distributors.id').notNullable().onDelete('CASCADE');
    table.string('name').notNullable();
    table.decimal('price').notNullable();
    table.timestamp('deleted_at').defaultTo(null)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
