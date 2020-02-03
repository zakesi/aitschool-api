var qiniu = require('qiniu');
var accessKey = process.env.AccessKey;
var secretKey = process.env.SecretKey
var domain = process.env.domain
var bucket = process.env.bucket

const qiniuController = {
  getQiniuToken:function(req, res,next){
    try{
      var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      var options = {
          scope: bucket
      };
      var putPolicy = new qiniu.rs.PutPolicy(options);
      var uploadToken=putPolicy.uploadToken(mac);
      res.json({code:0, data:{uploadToken,domain}, message:'请求成功'})
    }catch{
      res.json({code:1, message:"服务器错误"})
    }
  }
};
module.exports = qiniuController;