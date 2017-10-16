
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('items').del()
    .then(function () {
      // Inserts seed entries
      return knex('items').insert([
        {id: 1,
          user_id: 1,
          distributor_id: 1,
          name: '2bar Bourbon',
          price: 30},
        {id: 2,
          user_id: 1,
          distributor_id: 1,
          name: 'El Dorado Rum 15 year',
          price: 35},
        {id: 3,
          user_id: 1,
          distributor_id: 2,
          name: 'Alphabet Vodka',
          price: 29}
      ]);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('items_id_seq', (SELECT MAX(id) FROM items));"
      );
    });
};
