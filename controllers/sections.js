const schema = require('async-validator').default;
const Section = require('./../models/section.js')
const sectionControllers = {
  show: async function(req, res, next){
    try{
      const id = req.params.id;
      const Sections = await Section.show({id});
      res.json({error_code: 0, data: {Sections:Sections[0]}})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  sort: async function(req, res, next){
    try{
      let data = req.body.data;
      await Promise.all(data.map(async item => {
       let zhi = await Section.update(Number(item.id), {sort: Number(item.index)})
       return zhi
      }))
      res.json({error_code: 0, message: '成功排序'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  store: async function(req, res, next){
    try{
      const chapter_id = req.body.chapter_id;
      const name = req.body.name;
      const validator = new schema({
        chapter_id:  { type: 'number', required: true },
        name:  { type: 'string', required: true },
      })
      const params = {chapter_id, name}
      await validator.validate(params)
      await Section.insert(params)
      res.json({error_code: 0, message:'添加成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  update: async function(req, res, next){   
    try{
      const id = req.params.id;
      // const chapter_id = req.body.chapter_id;
      const name = req.body.name;
      const content = req.body.content || '';
      const video_url = req.body.video_url || '';
      const validator = new schema({
        name:  { type: 'string', required: true },
        content:  { type: 'string', required: true },
        video_url:  { type: 'string', required: true },
      })
      const params = {name, content, video_url}
      await validator.validate(params)
      await Section.update(id, params)
      let coursesData = await Section.where({'sections.id':id})
      .leftJoin('chapters','chapters.id','sections.chapter_id')
      .select({course_id:'chapters.course_id'})
      res.json({error_code: 0, message:'编辑成功',data:coursesData[0]})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  },
  destroy: async function(req, res, next){
    try{
      const id = req.params.id;
      await Section.update(id, {status:1})
      res.json({error_code: 0, message: '删除成功'})
    }catch(e){
      res.json({error_code: 1, message: e.message})
    }
  }
}
module.exports = sectionControllers