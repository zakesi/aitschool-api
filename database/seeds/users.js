exports.seed = function(knex) {
  return Promise.all([
    knex('users').insert([
      { 
        openid: 'oCI_l1CPdwAofDLQ9o5Y2L31xK7I',
        unionid:"ocWmn1HTooaYXFY3Y29MgvS0lBrc",
        nickname:"JaxChu",
        gender:1,
        city:"海淀",
        province:"北京",
        country:"中国",
        avatar_url:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ7g7P1d5ddBiaE8UicvAk87yBKq4icFa4BP6eicHZkymPMR0bicibWuTQ55ChCvWqkQBr6zg4ibpmESljdg/132",
      },
    ]),

    knex('roles').insert([
      { id: 1, name: '管理员' },
    ]),

    knex('permission_groups').insert([
      { id: 1, name: '通用管理' },
      { id: 2, name: '设置' },
    ]),

    knex('permissions').insert([
      { id: 1, group_id: 1, slug: 'carousel-manager', name: '轮播图管理' },
      { id: 2, group_id: 2, slug: 'admin-manager', name: '管理员' },
    ]),

    knex('role_permissions').insert([
      { role_id: 1, permission_id: 1 },
      { role_id: 1, permission_id: 2 },
    ]),

    knex('user_roles').insert([
      { role_id: 1, user_id: 1 },
    ])
  ])
};
