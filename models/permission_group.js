const basicModel = require('./index.js');

class permissionGroupModel extends basicModel {
  constructor(props = "permission_groups") {
    super(props);
  }
}

module.exports = new permissionGroupModel();
