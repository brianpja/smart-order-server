
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('orders_items').del()
    .then(function () {
      // Inserts seed entries
      return knex('orders_items').insert([
        {id: 1,
          order_id: 1,
          item_id: 1,
          quantity: 1,
          price: 30},
        {id: 2,
          order_id: 1,
          item_id: 2,
          quantity: 1,
          price: 35},
        {id: 3,
          order_id: 1,
          item_id: 3,
          quantity: 1,
          price: 29}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('orders_items_id_seq', (SELECT MAX(id) FROM orders_items));"
      );
    });
};
