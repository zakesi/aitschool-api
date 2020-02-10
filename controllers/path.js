const schema = require('async-validator').default;
const Path = require('./../models/path.js')
const PathCourse = require('./../models/path_course.js')

const pathController = {
  index: async function(req, res, next) {
    try {
      const plan_id = req.query.plan_id;
      const paths = await Path.show({ plan_id });
      res.json({error_code: 0, data: { paths } })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }
  },
  show: async function(req, res, next) {
    try{
      const id = req.params.id;
      const paths = await Path.show({ id });
      const courses = await PathCourse.where({path_id:id})
      .leftJoin('courses','path_courses.course_id','courses.id')
      .column('courses.*')
      res.json({error_code: 0, data: { paths:paths[0],courses } })

    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  store: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const plan_id = req.body.plan_id;
    const sort =  Number(req.body.sort) || 0;
    const validator = new schema({
      name:  { type: 'string', required: true },
      description:  { type: 'string', required: true },
      plan_id:  { type: 'number', required: true },
    })
    const params = { name, description, plan_id, sort };
    try {
      await validator.validate(params)
      const ids = await Path.insert(params);
      res.json({error_code: 0, data: { id: ids[0] }, message: '创建成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  update: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const plan_id = req.body.plan_id;
    const sort =  Number(req.body.sort) || 0;
    const validator = new schema({
      name:  { type: 'string', required: true },
      description:  { type: 'string', required: true },
      plan_id:  { type: 'number', required: true },
    })
    const params = { name, description, plan_id, sort };
    try {
      const id = req.params.id;
      await validator.validate(params)
      await Path.update(id, params);
      res.json({error_code: 0, message: '编辑成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      await Path.delete({id});
      await PathCourse.delete({path_id:id})
      res.json({error_code: 0, message: '删除成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }
  },
  courseStore: async function(req, res, next) {
    try {
      const path_id = req.params.id;
      const course_id = req.params.course_id;
      const params = { path_id, course_id };
      // 查询是否添加过
      const hasCourse = await PathCourse.show(params);
      if(hasCourse.length) {
        return res.json({error_code:1 , message: '该课程 ID 已被添加'})
      }
      // 查询是否有该课程
      // #TBD
      const ids = await PathCourse.insert(params);
      res.json({error_code: 0, data: { id: ids[0] }, message: '创建成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  courseUpdate: async function(req, res, next) {
    const sort =  Number(req.body.sort) || 0;
    const params = { sort };
    try {
      const path_id = req.params.id;
      const course_id = req.params.course_id;
      await PathCourse.where({ course_id, path_id }).update(params)
      res.json({error_code: 0, message: '编辑成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  courseDestroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      const course_id = req.params.course_id;
      await PathCourse.delete({id, course_id});
      res.json({error_code: 0, message: '删除成功' })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }
  },
}

module.exports = pathController;
