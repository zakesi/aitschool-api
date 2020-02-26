exports.up = function(knex) {
  return knex.schema
    .createTable("paths", function(table) {
      table.increments("id");
      table.string("name", 255).comment("名称");
      table.string("description", 500).comment("名称");
      table.integer("sort").comment("排序");
      table.integer("plan_id").comment("关联计划");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("path_courses", function(table) {
      table.integer("path_id");
      table.integer("course_id");
      table.integer("sort");
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable("paths").dropTable("path_courses");
};

exports.config = { transaction: false };
