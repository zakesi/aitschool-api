const basicModel = require("./index.js");

class versionModel extends basicModel {
  constructor(props = "versions") {
    super(props);
  }
}

module.exports = new versionModel();
