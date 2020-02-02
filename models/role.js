const basicModel = require('./index.js');

class roleModel extends basicModel {
  constructor(props = "roles") {
    super(props);
  }
}

module.exports = new roleModel();
