exports.up = function(knex) {
  return knex.schema
    .createTable('carousels', function (table) {
      table.increments('id');
      table.integer('platfrom', 11).comment('平台:1 pc、2 m');
      table.integer('sort').comment('排序');
      table.text('image_url').comment('图片地址');
      table.text('router_url').comment('重定向地址');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("carousels");
};

exports.config = { transaction: false };