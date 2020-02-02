const schema = require('async-validator').default;
const Plan = require('./../models/plan.js')

const planController = {
  index: async function(req, res, next) {
    try {
      const plans = await Plan.all();
      res.json({error_code: 0, data: { plans } })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }
  },
  store: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const image_url = req.body.image_url;
    const sort =  Number(req.body.sort) || 0;
    const validator = new schema({
      name:  { type: 'string', required: true },
      description:  { type: 'string', required: true },
      image_url:  { type: 'string', required: true },
    })
    const params = { name, description, image_url, sort };
    try {
      await validator.validate(params)
      const ids = await Plan.insert(params);
      res.json({error_code: 0, data: { id: ids[0] }, message: '创建成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  update: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const image_url = req.body.image_url;
    const sort =  Number(req.body.sort) || 0;
    const validator = new schema({
      name:  { type: 'string', required: true },
      description:  { type: 'string', required: true },
      image_url:  { type: 'string', required: true },
    })
    const params = { name, description, image_url, sort };
    try {
      const id = req.params.id;
      await validator.validate(params)
      await Plan.update(id, params);
      res.json({error_code: 0, message: '编辑成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      await Plan.delete({id});
      res.json({error_code: 0, message: '删除成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }
  },
}

module.exports = planController;
