exports.seed = function(knex) {
  return knex('carousels').insert([
      { 
        platfrom: 1,
        sort: 1,
        image_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        router_url: 'https://www.google.com/'
      },
    ])
};

