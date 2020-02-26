const qiniu = require("qiniu");
const accessKey = process.env.QINIU_ACCESS_KEY;
const secretKey = process.env.QINIU_SECRET_KEY;
const domain = process.env.QINIU_DOMAIN;
const bucket = process.env.QINIU_BUCKET;

const qiniuController = {
  getQiniuToken: function(req, res, next) {
    try {
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options = {
        scope: bucket
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const token = putPolicy.uploadToken(mac);
      res.json({ error_code: 0, data: { token, domain }, message: "请求成功" });
    } catch (e) {
      res.json({ error_code: 1, message: "服务器错误" });
    }
  }
};
module.exports = qiniuController;
