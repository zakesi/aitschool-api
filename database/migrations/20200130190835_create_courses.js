exports.up = function(knex) {
  return knex.schema
    .createTable('courses', function (table) {
      table.increments('id');
      table.string('name', 255);
      table.string('short_name', 255);
      table.text('tips').comment('提示');
      table.text('description').comment('描述');
      table.integer('status').comment('状态');
      table.text('image_url').comment('图片地址');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('chapters', function (table) {
      table.increments('id');
      table.integer('course_id');
      table.string('name', 255);
      table.text('description').comment('描述');
      table.integer('sort').comment('排序');
      table.integer('status').comment('状态');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
    .createTable('sections', function (table) {
      table.increments('id');
      table.integer('chapter_id');
      table.string('name', 255);
      table.text('content').comment('内容');
      table.text('video_url').comment('视频地址');
      table.integer('sort').comment('排序');
      table.integer('status').comment('状态');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTable("courses")
    .dropTable("chapters")
    .dropTable("sections")
};

exports.config = { transaction: false };