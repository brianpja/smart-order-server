
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('distributors').del()
    .then(function () {
      // Inserts seed entries
      return knex('distributors').insert([
        {id: 1,
          name: 'Vinum',
          contact: 'Jimmy',
          email: 'brianpja@gmail.com' },
        {id: 2,
          name: 'Alphabet Vodka',
          contact: 'Marty', 
          email: 'brianpja@gmail.com'}
      ]);
    });
};
