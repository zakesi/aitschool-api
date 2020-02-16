const express = require('express');
const router = express.Router();
const carouselController = require('./../controllers/carousel.js');
const permissionController = require('./../controllers/permission.js');
const roleController = require('./../controllers/role.js');
const managerController = require('./../controllers/manager.js');
const planController = require('./../controllers/plan.js');
const pathController = require('./../controllers/path.js');
const courseController = require('./../controllers/course.js');
const projectController = require('./../controllers/project.js');
const qiniuController = require('./../controllers/qiniu.js');
const chaptersController = require('./../controllers/chapters.js')
const sectionsController = require('./../controllers/sections.js')
const path_coursesController = require('./../controllers/path_courses.js');


const Auth = require('./../middlewares/auth.js');
// 必须登录
// router.use(Auth.isLogin);
// 轮播图管理
// Auth.permission('carousel-manager'),
router.get('/carousel', carouselController.index);
router.post('/carousel', carouselController.store);
router.put('/carousel/:id', carouselController.update);
router.delete('/carousel/:id', carouselController.destroy);
router.get('/qiniu/token',qiniuController.getQiniuToken)
// 角色管理
router.get('/role', roleController.index);
router.post('/role', roleController.store);
router.put('/role/:id', roleController.update);
router.delete('/role/:id', roleController.destroy);
// 管理员管理
router.get('/manager', managerController.index);
router.get('/manager/:id', managerController.details);
router.post('/manager', managerController.store);
router.put('/manager/:id', managerController.update);
router.delete('/manager/:id', managerController.destroy);
router.post('/getPermission/', managerController.getPermissionArr);

// 登陆
router.post('/manager/login', managerController.login);

// 用户角色管理
router.get('/role/:id/users', roleController.getUsers);
router.post('/role/:id/users', roleController.storeUsers);
router.delete('/role/:id/users', roleController.destoryUsers);
// 角色权限管理
router.get('/permissions', permissionController.index);
router.get('/role/:id/permissions', roleController.getPermissions);
router.put('/role/:id/permissions', roleController.updatePermissions);
// 计划管理
router.get('/plan', planController.index);
router.get('/plan/:id', planController.show);
router.post('/plan', planController.store);
router.put('/plan/:id', planController.update);
router.delete('/plan/:id', planController.destroy);
// 路径管理
router.get('/path', pathController.index);
router.get('/path/:id', pathController.show);
router.post('/path', pathController.store);
router.put('/path/:id', pathController.update);
router.delete('/path/:id', pathController.destroy);
// 路径关联课程
router.post('/path/:id/course', pathController.courseStore);
router.put('/path/:id/course/:course_id', pathController.courseUpdate);
router.delete('/path/:id/course/:course_id', pathController.courseDestroy);
// 路径关联课程排序
router.post('/path/course/store', path_coursesController.store);
router.post('/path/course/sort', path_coursesController.sort);
router.delete('/path/course/sort', path_coursesController.destroy);

// 课程管理
router.get('/course', courseController.index);
router.get('/course/:id', courseController.show);
router.post('/course', courseController.store);
router.put('/course/:id', courseController.update);
router.delete('/course/:id', courseController.destroy);
// 章管理
router.get('/chapters/:id', chaptersController.index);
router.post('/chapters', chaptersController.store);
router.put('/chapters/:id', chaptersController.update);
router.delete('/chapters/:id', chaptersController.destroy);
// 节管理
router.get('/sections/:id', sectionsController.show);
router.post('/sections', sectionsController.store);
router.post('/sections/sort', sectionsController.sort);
router.put('/sections/:id', sectionsController.update);
router.delete('/sections/:id', sectionsController.destroy);
// 项目管理
router.get('/project', projectController.index);
router.post('/project', projectController.store);
router.put('/project/:id', projectController.update);
router.delete('/project/:id', projectController.destroy);

module.exports = router;
