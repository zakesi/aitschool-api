const schema = require('async-validator').default;
const rolePermission = require('./../models/role_permission.js')
const PermissionGroup = require('./../models/permission_group.js')
const Permission = require('./../models/permission.js')

const permissionlController = {
  index: async function(req, res, next) {
    try {
      const permissionGroup = await PermissionGroup.all()
      const permissions = await Permission.all()
      const permissionGroupDiv = {}
      permissionGroup.forEach(data => {
        data.children = []
        permissionGroupDiv[data.id] = data
      })
      permissions.forEach( data => {
        permissionGroupDiv[data.group_id].children.push(data)
      })
      const permissionsTransform = Object.values(permissionGroupDiv)
      res.json({error_code: 0, data: { permissions: permissionsTransform } })
    } catch (e) {
      res.json({error_code: 1, message: e.message})
    }

  },
  update: async function(req, res, next) {

  },
}

module.exports = permissionlController;
