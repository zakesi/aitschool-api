exports.seed = function(knex) {
  return Promise.all([
    knex("courses").insert([
      {
        name: "HTML",
        short_name: "HTML 基础",
        tips: "Web 入门必修课",
        description: "HTML 描述"
      }
    ]),

    knex("chapters").insert([
      {
        name: "第一章",
        course_id: 1,
        sort: 1
      },
      {
        name: "第二章",
        course_id: 1,
        sort: 2
      }
    ]),

    knex("sections").insert([
      {
        chapter_id: 1,
        name: "第一节",
        content: "# 内容"
      },
      {
        chapter_id: 1,
        name: "第二节",
        content: "# 内容"
      },
      {
        chapter_id: 2,
        name: "第三节",
        content: "# 内容"
      }
    ])
  ]);
};
