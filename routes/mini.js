const express = require("express");
const router = express.Router();
const Auth = require("./../middlewares/auth.js");
const wechatController = require("./../controllers/wechat.js");
const userController = require("./../controllers/user.js");

router.post("/wechat/oauth", wechatController.oAuthMini);
router.post("/wechat/phone", Auth.isLogin, wechatController.bindPhoneNumber);
router.post(
  "/wechat/sessionkey",
  Auth.isLogin,
  wechatController.updateSessionKey
);
router.post("/wechat/userinfo", userController.showMini);

module.exports = router;
