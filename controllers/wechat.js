const { Wechat } = require('wechat-jssdk');
const schema = require('async-validator').default;
const wechatService = require('./../services/wechat.js')
const userService = require('./../services/user.js')

const wechatController = {
  oAuthWebUrl: function(req, res, next) {
    const wechatOAuthUrl = wechatService.oAuthWebUrl();
    res.redirect(wechatOAuthUrl);
  },
  oAuthWeb: async function(req, res, next) {
    const code = req.query.code;
    const validator = new schema({
      code:  { type: 'string', required: true }
    })
    try {
      await validator.validate({ code })
      const userInfo = await wechatService.oAuthWeb(code)
      const token = await userService.token(userInfo)
      res.json({error_code: 0, data: { userInfo, token}})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  oAuthMini: async function(req, res, next) {
    const code = req.body.code;
    const iv = req.body.iv;
    const encrypted_data = req.body.encrypted_data;
    const validator = new schema({
      code:  { type: 'string', required: true },
      iv:  { type: 'string', required: true },
      encrypted_data:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ code, iv, encrypted_data })
      const userInfo = await wechatService.oAuthMini(code, iv, encrypted_data)
      const token = await userService.token(userInfo)
      res.json({error_code: 0, data: { userInfo, token}})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  bindPhoneNumber: async function(req, res, next) {
    const code = req.body.code;
    const iv = req.body.iv;
    const encrypted_data = req.body.encrypted_data;
    const validator = new schema({
      code:  { type: 'string', required: true },
      iv:  { type: 'string', required: true },
      encrypted_data:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ code, iv, encrypted_data })
      const phone = await wechatService.getPhoneNumber(code, iv, encrypted_data)
      res.json({error_code: 0, data: { phone }})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  }
}

module.exports = wechatController;