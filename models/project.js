const basicModel = require('./index.js');

class projectModel extends basicModel {
  constructor(props = "projects") {
    super(props);
  }
}

module.exports = new projectModel();
