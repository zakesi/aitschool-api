const schema = require('async-validator').default;
const Chapter = require('./../models/chapters.js')
const Section = require('./../models/section.js')

const chaptersControllers = {
  index: async function(req, res, next) {
    try{
      const course_id = req.params.id;
      const chapters = await Chapter.where({course_id}).whereNull('status').orderBy('sort');
      const ChapterArr = await Promise.all(chapters.map(async item => {
        item.sectionArr = await Section.where({chapter_id:item.id}).whereNull('status').orderBy('sort');
        return item
      }))
      res.json({error_code: 0, data: {ChapterArr}})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  show: async function(req, res, next){
    try{
      const id = req.params.id;
      const Chapters = await Chapter.show({id})
      res.json({error_code: 0, data: {Chapters:Chapters[0]}})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  store: async function(req, res, next) {
    try{
      const course_id = Number(req.body.course_id);
      const name = req.body.name;
      const description = req.body.description;
      const sort = req.body.sort;
      const validator = new schema({
        course_id:  { type: 'number', required: true },
        name:  { type: 'string', required: true },
        description:  { type: 'string', required: true },
        sort:  { type: 'number', required: true },
      })
      const params = {course_id, name, description, sort}
      await validator.validate(params)
      await Chapter.insert(params)
      res.json({error_code: 0, message: '添加成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  update: async function(req, res, next){
    try{
      const id = req.params.id;
      const course_id = Number(req.body.course_id);
      const name = req.body.name;
      const description = req.body.description;
      const sort = req.body.sort;
      const validator = new schema({
        course_id:  { type: 'number', required: true },
        name:  { type: 'string', required: true },
        sort:  { type: 'number', required: true },
        description:  { type: 'string', required: true },
      })
      const params = {course_id, name, description, sort}
      await validator.validate(params)
      await Chapter.update(id, params)
      res.json({error_code: 0, message: '编辑成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  destroy: async function(req, res, next){
    try{
      const id = req.params.id;
      await Chapter.update(id, {status:1})
      res.json({error_code: 0, message: '删除成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  }
}
module.exports = chaptersControllers;
