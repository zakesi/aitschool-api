const schema = require('async-validator').default;
const wechatService = require('./../services/wechat.js')
const userService = require('./../services/user.js')

const { Wechat } = require('wechat-jssdk');
const wechatConfig = require('./../wechatConfig.js')
const wx = new Wechat(wechatConfig);
const User = require('./../models/user.js');

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
      const unionid = userInfo.unionid;
      const token = await userService.token(userInfo)
      res.json({error_code: 0, data: { userInfo, token}})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  updateSessionKey: async function(req, res, next) {
    const code = req.body.code;
    const id = res.locals.user_id;
    const validator = new schema({
      code:  { type: 'string', required: true },
    })
    try {
      await validator.validate({ code })
      const sessionInfo = await wechatService.getSession(code);
      const sessionKey = sessionInfo.session_key;
      await User.update(id, {
        session_key: sessionKey
      });
      res.json({error_code: 0, message: '更新登录态成功'})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  },
  bindPhoneNumber: async function(req, res, next) {
    const iv = req.body.iv;
    const encrypted_data = req.body.encrypted_data;
    const id = res.locals.user_id;
    const validator = new schema({
      iv:  { type: 'string', required: true },
      encrypted_data:  { type: 'string', required: true },
    })
    try {
      await validator.validate({iv, encrypted_data })
      const users = await User.where({ id });
      const sessionKey = users[0].session_key;
      const phone = await wechatService.getPhoneNumber(sessionKey, iv, encrypted_data);
      res.json({error_code: 0, data: { phone }})
    } catch (e) {
      res.json({error_code: 1, message: e.message || e.errors})
    }
  }
}

module.exports = wechatController;