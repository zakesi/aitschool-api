exports.up = function(knex) {
  return knex.schema
    .createTable("projects", function(table) {
      table.increments("id");
      table.string("name", 255);
      table.text("description").comment("描述");
      table.integer("status").comment("状态");
      table.text("image_url").comment("图片地址");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("versions", function(table) {
      table.increments("id");
      table.string("name", 255);
      table.text("description").comment("描述");
      table.integer("project_id");
      table.integer("sort").comment("排序");
      table.integer("status").comment("状态");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("stories", function(table) {
      table.increments("id");
      table.string("name", 255);
      table.text("description").comment("描述");
      table.integer("version_id");
      table.integer("project_id");
      table.integer("sort").comment("排序");
      table.integer("status").comment("状态");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    })
    .createTable("tasks", function(table) {
      table.increments("id");
      table.string("name", 255);
      table.text("content").comment("内容");
      table.integer("story_id");
      table.integer("version_id");
      table.integer("project_id");
      table.integer("level").comment("难度：1 ～ 5");
      table.integer("sort").comment("排序");
      table.integer("status").comment("状态");
      table.timestamp("created_at").defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("projects")
    .dropTable("versions")
    .dropTable("stories")
    .dropTable("tasks");
};

exports.config = { transaction: false };
