const PathCourses = require('./../models/path_course')
const Course = require('./../models/course.js')
const PathCoursesControllers = {
  sort: async function(req, res, next){
    try{
      let data = req.body.data;
      await Promise.all(data.map(async item => {
        let zhi = await PathCourses.where({path_id:item.path_id, course_id:item.course_id}).update({sort: Number(item.index)})
        return zhi
      }))
      res.json({error_code: 0, message: '成功排序'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  store: async function(req, res, next){
    try{
      
      let juedes = req.body.CourseArrId.indexOf(',')
      let data = []
      if(juedes > 0) data = req.body.CourseArrId.split(',');
      if(juedes <= 0)data = [req.body.CourseArrId ]
      const path_id = req.body.path_id;
      let juede = data.every(item => !isNaN(item))
      if(!juede) return res.json({error_code: 1, message: '请输入正确数值'})
      const gist = await Course.knex().whereIn('id',data);
      if(gist.length != data.length) return res.json({error_code: 1, message: '请勿填写无效课程'})
      await Promise.all(data.map(async item => {
        let gists = await PathCourses.where({path_id, course_id:item})
        if(gists.length) return res.json({error_code: 1, message: '课程已有存在，请勿重复添加'})
        return gists
      }))
      await Promise.all(data.map(async item => {
        let zhi = await PathCourses.insert({path_id, course_id:item})
        return zhi
      }))
      res.json({error_code: 0, message: '添加成功'})

    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  destroy: async function(req, res, next) {
    try{
      let path_id = req.query.path_id;
      let course_id = req.query.course_id;
      await PathCourses.where({path_id, course_id}).del()
      res.json({error_code: 0, message: '删除成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  }
}
module.exports = PathCoursesControllers