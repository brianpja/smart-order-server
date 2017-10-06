
exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders_items', (table) => {
    table.increments();
    table.integer('order_id').references('orders.id').notNullable().onDelete('CASCADE');
    table.integer('item_id').references('items.id').notNullable().onDelete('CASCADE');
    table.integer('quantity').notNullable();
    table.decimal('price').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders_items');
};
