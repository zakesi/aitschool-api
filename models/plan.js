const basicModel = require('./index.js');

class planModel extends basicModel {
  constructor(props = "plans") {
    super(props);
  }
}

module.exports = new planModel();
