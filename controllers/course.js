const schema = require("async-validator").default;
const Course = require("./../models/course.js");
// const Chapter = require('./../models/chapters.js')
// const Section = require('./../models/section.js')

const courseController = {
  index: async function(req, res, next) {
    try {
      const courses = await Course.all().whereNull("status");
      res.json({ error_code: 0, data: { courses } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  show: async function(req, res, next) {
    try {
      let id = req.params.id;
      const courses = await Course.where({ id });
      res.json({ error_code: 0, data: { courses: courses[0] } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  store: async function(req, res, next) {
    try {
      const name = req.body.name;
      const short_name = req.body.short_name;
      const tips = req.body.tips;
      const description = req.body.description;
      const image_url = req.body.image_url;
      const validator = new schema({
        name: { type: "string", required: true },
        short_name: { type: "string", required: true },
        tips: { type: "string", required: true },
        image_url: { type: "string", required: true },
        description: { type: "string", required: true }
      });
      const params = { name, short_name, tips, description, image_url };
      await validator.validate(params);
      await Course.insert(params);
      res.json({ error_code: 0, message: "创建成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  update: async function(req, res, next) {
    const id = req.params.id;
    const name = req.body.name;
    const short_name = req.body.short_name;
    const tips = req.body.tips;
    const description = req.body.description;
    const image_url = req.body.image_url;
    try {
      const validator = new schema({
        name: { type: "string", required: true },
        short_name: { type: "string", required: true },
        tips: { type: "string", required: true },
        image_url: { type: "string", required: true },
        description: { type: "string", required: true }
      });
      const params = { name, short_name, tips, description, image_url };
      await validator.validate(params);
      await Course.update(id, params);
      res.json({ error_code: 0, message: "编辑成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      await Course.update(id, { status: 1 });
      res.json({ error_code: 0, message: "删除成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  }
};

module.exports = courseController;
