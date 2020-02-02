const express = require('express');
const router = express.Router();
const wechatController = require('./../controllers/wechat.js')

router.post('/wechat/oauth', wechatController.oAuthMini)
router.post('/wechat/phone', wechatController.bindPhoneNumber)

module.exports = router;
