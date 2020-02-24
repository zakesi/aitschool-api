exports.seed = function(knex) {
  return knex('manager').insert([
      { 
        name: 'Jax',
        phone: 13511111111,
        password: '123456',
        roles_id: 1
      },
    ])
};

