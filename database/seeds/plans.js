exports.seed = function(knex) {
  return Promise.all([
    knex('plans').insert([
      { 
        name: '微信小程序工程师',
        description: '微信小程序开发工程师是当前互联网行业里亟需招聘岗位，它能够综合运用微信提供的生态和前端技术，集设计、前端、后端、运维于一身，为用户提供接近原生的交互体验，是一个新兴的“全栈”发展方向。',
        sort: 1,
        image_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
      },
    ]),

    knex('paths').insert([
      {
        name: '实习',
        description: '刚刚接触',
        plan_id: 1,
        sort: 1,
      },
      {
        name: '初级',
        description: '可以干活',
        plan_id: 1,
        sort: 2,
      },
      {
        name: '中级',
        description: '熟练干活',
        plan_id: 1,
        sort: 3,
      },
      {
        name: '高级',
        description: '解决问题',
        plan_id: 1,
        sort: 4,
      },
    ]),

    knex('path_courses').insert([
      {
        path_id: 1,
        course_id: 1,
        sort: 1
      }
    ])
  ])
};


