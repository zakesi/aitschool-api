const schema = require("async-validator").default;
const Carousel = require("./../models/carousel.js");
const carouselController = {
  // 轮播图列表
  index: async function(req, res, next) {
    try {
      const carousels = await Carousel.all().orderBy("sort");
      res.json({ error_code: 0, data: { carousels } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  // 创建轮播图
  store: async function(req, res, next) {
    const platfrom = Number(req.body.platfrom) || 1;
    const sort = Number(req.body.sort) || 0;
    const image_url = req.body.image_url;
    const router_url = req.body.router_url;
    const validator = new schema({
      platfrom: { type: "number", required: true },
      image_url: { type: "string", required: true },
      router_url: { type: "string", required: true }
    });
    const params = { platfrom, sort, image_url, router_url };
    try {
      await validator.validate(params);
      const ids = await Carousel.insert(params);
      res.json({ error_code: 0, data: { id: ids[0] }, message: "创建成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  // 编辑轮播图
  update: async function(req, res, next) {
    const platfrom = Number(req.body.platfrom) || 1;
    const sort = Number(req.body.sort) || 0;
    const image_url = req.body.image_url;
    const router_url = req.body.router_url;
    const validator = new schema({
      platfrom: { type: "number", required: true },
      sort: { type: "number", required: true },
      image_url: { type: "string", required: true },
      router_url: { type: "string", required: true }
    });
    const params = { platfrom, sort, image_url, router_url };
    try {
      const id = req.params.id;
      await validator.validate(params);
      await Carousel.update(id, params);
      res.json({ error_code: 0, message: "编辑成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  // 删除轮播图
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      await Carousel.delete({ id });
      res.json({ error_code: 0, message: "删除成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  }
};

module.exports = carouselController;
