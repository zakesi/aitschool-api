const servicesUser = require('./../services/user')
const userService = require('./../services/user.js')

module.exports = {
  isLogin: function(req, res, next) {
    try{
      const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';  
      const decoded = servicesUser.decode(token);
      res.locals.user_id = decoded.data.user_id;
      next();
    }catch(e){
      return res.status(401).json({
        error_code: 401,
        message :'Auth Empty'
      })
    }
  },
  isManagerLogin: function(req, res, next) {
    try{
      const token = req.headers.authorization
      ? req.headers.authorization.split(' ')[1]
      : '';  
      const decoded = servicesUser.decode(token);
      res.locals.manager_id = decoded.data.manager_id;
      next();
    }catch(e){
      return res.status(401).json({
        error_code: 401,
        message :'Auth Empty'
      })
    }
  },
  permission: function(permission) {
    return async function(req, res, next) {
      const user_id = res.locals.user_id;
      const hasPermission = await userService.hasPermission(user_id, permission)
      if(hasPermission) {
        next();
      } else {
        return res.status(403).json({
          error_code: 403,
          message :'Auth Forbidden'
        })
      }
    }
  },
}
