const basicModel = require('./index.js');

class userRoleModel extends basicModel {
  constructor(props = "user_roles") {
    super(props);
  }
}

module.exports = new userRoleModel();
