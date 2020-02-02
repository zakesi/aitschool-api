const express = require('express');
const router = express.Router();
const carouselController = require('./../controllers/carousel.js');
const permissionController = require('./../controllers/permission.js');
const roleController = require('./../controllers/role.js');
const planController = require('./../controllers/plan.js');
const pathController = require('./../controllers/path.js');
const courseController = require('./../controllers/course.js');
const projectController = require('./../controllers/project.js');
const Auth = require('./../middlewares/auth.js');
// 必须登录
router.use(Auth.isLogin);
// 轮播图管理
router.get('/carousel', Auth.permission('carousel-manager'), carouselController.index);
router.post('/carousel', Auth.permission('carousel-manager'), carouselController.store);
router.put('/carousel/:id', Auth.permission('carousel-manager'), carouselController.update);
router.delete('/carousel/:id', Auth.permission('carousel-manager'), carouselController.destroy);
// 角色管理
router.get('/role', roleController.index);
router.post('/role', roleController.store);
router.put('/role/:id', roleController.update);
router.delete('/role/:id', roleController.destroy);
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
router.post('/plan', planController.store);
router.put('/plan/:id', planController.update);
router.delete('/plan/:id', planController.destroy);
// 路径管理
router.get('/path', pathController.index);
router.post('/path', pathController.store);
router.put('/path/:id', pathController.update);
router.delete('/path/:id', pathController.destroy);
// 路径关联课程
router.post('/path/:id/course', pathController.courseStore);
router.put('/path/:id/course/:course_id', pathController.courseUpdate);
router.delete('/path/:id/course/:course_id', pathController.courseDestroy);
// 课程管理
router.get('/course', courseController.index);
router.post('/course', courseController.store);
router.put('/course/:id', courseController.update);
router.delete('/course/:id', courseController.destroy);
// 项目管理
router.get('/project', projectController.index);
router.post('/project', projectController.store);
router.put('/project/:id', projectController.update);
router.delete('/project/:id', projectController.destroy);

module.exports = router;
