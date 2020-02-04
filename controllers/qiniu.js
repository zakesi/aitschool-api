const qiniu = require('qiniu');
const accessKey = process.env.qiniuAccessKey;
const secretKey = process.env.qiniuSecretKey
const domain = process.env.qiniuDomain
const bucket = process.env.qiniuBucket

const qiniuController = {
  getQiniuToken:function(req, res,next){
    try{
      const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
      const options = {
          scope: bucket
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const token=putPolicy.uploadToken(mac);
      res.json({error_code:0, data:{token,domain}, message:'请求成功'})
    }catch{
      res.json({error_code:1, message:"服务器错误"})
    }
  }
};
module.exports = qiniuController;