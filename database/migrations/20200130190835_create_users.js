exports.up = function(knex) {
  return knex.schema
    // 用户
    .createTable('users', function (table) {
      table.increments('id');
      table.string('openid', 255).unique();
      table.string('unionid', 255).unique();
      table.string('appid', 255).comment('微信应用 ID');
      table.string('session_key', 255).comment('微信小程序登录态');
      table.string('phone', 255).unique();
      table.string('nickname', 255);
      table.string('avatar_url', 255);
      table.integer('gender', 11).comment('性别:1男、2女');
      table.string('country', 255);
      table.string('province', 255);
      table.string('city', 255);
      table.datetime('birthday');
      table.timestamp('created_at').defaultTo(knex.fn.now());
      table.timestamp('visited_at').defaultTo(knex.fn.now());
    })
    // 角色
    .createTable('roles', function (table) {
      table.increments('id');
      table.string('name', 255).unique();
      table.text('description').comment('描述');
    })
    .createTable('user_roles', function (table) {
      table.integer('user_id', 11)
      table.integer('role_id', 11)
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    // 权限
    .createTable('permission_groups', function (table) {
      table.increments('id');
      table.string('name', 255).unique();
    })
    .createTable('permissions', function (table) {
      table.increments('id');
      table.integer('group_id')
      table.string('slug').unique();
      table.string('name', 255).unique();
    })
    .createTable('role_permissions', function (table) {
      table.integer('role_id', 11);
      table.integer('permission_id', 11);
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("users")
    .dropTable("roles")
    .dropTable("user_roles")
    .dropTable("permission_groups")
    .dropTable("permissions")
    .dropTable("role_permissions");
};

exports.config = { transaction: false };