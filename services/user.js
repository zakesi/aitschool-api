const User = require('./../models/user.js');
const UserRole = require('./../models/user_role.js');
const Permission = require('./../models/permission.js');
const RolePermission = require('./../models/role_permission.js');

const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const userService = {
  token: async function(userInfo) {
    const unionid = userInfo.unionid;
    const userInfoRes = await User.show({ unionid })
    if(!userInfoRes.length) {
      const ids = await User.insert(userInfo);
      userInfo.id = ids[0]
    }else {
      userInfo.id = userInfoRes[0].id
      userInfo.phone = userInfoRes[0].phone
    }
    return JWT.sign({
      user_id: userInfo.id,
    }, JWT_SECRET, {
      expiresIn: '360d'
    });
  },
  hasPermission: async function(user_id, permission) {
    const userPermissions = await userService.getUserPermission(user_id)
    const permissions = await Permission.where({ slug: permission })

    if(!userPermissions) {
      return false
    }

    if(!permissions.length) {
      return false
    }
    const permission_id = permissions[0].id;
    return userPermissions
      .some(data => data.permission_id = permission_id)
  },
  getUserPermission: async function(user_id) {
    const roles = await UserRole.where({ user_id })
    if(!roles.length) {
      return false
    }

    const roleIds = roles.map(data => data.role_id)
    const rolePermissions = await RolePermission.knex()
      .whereIn('role_id', roleIds)
    return rolePermissions
  }
}

module.exports = userService;