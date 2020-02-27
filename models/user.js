const basicModel = require("./index.js");
const config = require("./../knexfile.js");

class userModel extends basicModel {
  constructor(props = "users") {
    super(props);
  }
}

module.exports = new userModel();
