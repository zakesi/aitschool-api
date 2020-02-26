exports.up = function(knex) {
  return knex.schema.createTable("plans", function(table) {
    table.increments("id");
    table.string("name", 255).comment("名称");
    table.string("description", 500).comment("名称");
    table.integer("sort").comment("排序");
    table.text("image_url").comment("图片地址");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("plans");
};

exports.config = { transaction: false };
