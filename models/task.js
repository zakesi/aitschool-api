const basicModel = require("./index.js");

class taskModel extends basicModel {
  constructor(props = "tasks") {
    super(props);
  }
}

module.exports = new taskModel();
