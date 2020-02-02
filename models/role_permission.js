const basicModel = require('./index.js');

class rolePermissionModel extends basicModel {
  constructor(props = "role_permissions") {
    super(props);
  }
}

module.exports = new rolePermissionModel();
