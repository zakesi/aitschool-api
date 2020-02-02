const { Wechat } = require('wechat-jssdk');
const wechatConfig = require('./../wechatConfig.js')
const wx = new Wechat(wechatConfig);
const wechatService = {
  // PC 扫码登录地址
  oAuthWebUrl: function() {
    const wechatReqUrl = 'https://open.weixin.qq.com/connect/qrconnect';
    const wechatQuery = `appid=${wechatConfig.appId}&redirect_uri=${wechatConfig.wechatRedirectUrl}`
    const wechatState = 'response_type=code&scope=snsapi_login&state=born2code#wechat_redirect'
    return `${wechatReqUrl}?${wechatQuery}&${wechatState}`
  },
  // PC 扫码登录
  oAuthWeb:async function(code) {
    const userInfo = await wx.oauth.getUserInfo(code)
    return {
      openid: userInfo.openid,
      unionid: userInfo.unionid,
      nickname: userInfo.nickname,
      avatar_url: userInfo.headimgurl,
      gender: userInfo.sex,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
    }
  },
  // 小程序登录
  oAuthMini: async function(code, iv, encryptedData) {
    const sessionInfo = await wx.miniProgram.getSession(code)
    const sessionKey = sessionInfo.session_key
    const userInfo = await wx.miniProgram.decryptData(encryptedData, iv, sessionKey)
    return {
      openid: userInfo.openId,
      unionid: userInfo.unionId,
      nickname: userInfo.nickName,
      avatar_url: userInfo.avatarUrl,
      gender: userInfo.gender,
      country: userInfo.country,
      province: userInfo.province,
      city: userInfo.city,
    }
  },
  // 获取手机号
  getPhoneNumber: async function(code, iv, encryptedData) {
    const sessionInfo = await wx.miniProgram.getSession(code)
    const sessionKey = sessionInfo.session_key
    const phoneInfo = await wx.miniProgram.decryptData(encryptedData, iv, sessionKey)
    return phoneInfo.purePhoneNumber
  }
}

module.exports = wechatService;