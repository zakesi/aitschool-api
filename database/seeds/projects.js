exports.seed = function(knex) {
  return Promise.all([
    knex('projects').insert([
      { 
        name: '极客小程序',
        description: '极客学院小程序描述'
      },
    ]),

    knex('versions').insert([
      {
        name: 'V1.0',
        description: '极客归来',
        project_id: 1,
      },
      {
        name: 'V1.1',
        description: '极客雄起',
        project_id: 1,
      },
    ]),

    knex('stories').insert([
      {
        version_id: 1,
        project_id: 1,
        name: '用户可以登录注册',
        description: '手机用户信息哔哩吧啦',
        sort: 1,
      },
      {
        version_id: 1,
        project_id: 1,
        name: '用户可以观看视频',
        description: '用户可以观看视频哔哩吧啦',
        sort: 2,
      }
    ]),

    knex('tasks').insert([
      {
        story_id: 1,
        version_id: 1,
        project_id: 1,
        name: '登录页面',
        content: '手机用户信息哔哩吧啦',
        sort: 1,
      },
      {
        story_id: 1,
        version_id: 1,
        project_id: 1,
        name: '登录 API',
        content: '登录 API哔哩吧啦',
        sort: 2,
      },
      {
        story_id: 2,
        version_id: 1,
        project_id: 1,
        name: '视频页面',
        content: '手机用户信息哔哩吧啦',
        sort: 1,
      },
      {
        story_id: 2,
        version_id: 1,
        project_id: 1,
        name: '视频 API',
        content: '登录 API哔哩吧啦',
        sort: 2,
      },
    ])
  ])
};