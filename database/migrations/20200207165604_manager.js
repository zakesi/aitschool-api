exports.up = function(knex) {
  return knex.schema.createTable("manager", function(table) {
    table.increments("id");
    table.string("name", 255).comment("管理员名称");
    table.string("phone", 255).comment("手机号码");
    table.string("password", 255).comment("密码");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.integer("isdeleted", 11).comment("软删除： null：存在。0：删除");
    table.integer("roles_id", 11).comment("角色id");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("manager");
};

exports.config = { transaction: false };
