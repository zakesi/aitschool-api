const express = require("express");
const router = express.Router();
const wechatController = require("./../controllers/wechat.js");
const carouselController = require("./../controllers/carousel.js");
const planController = require("./../controllers/plan.js");

router.get("/carousel", carouselController.index);
router.get("/wechat/oauth-url", wechatController.oAuthWebUrl);
router.get("/wechat/oauth", wechatController.oAuthWeb);
router.get("/plan", planController.index);
module.exports = router;
