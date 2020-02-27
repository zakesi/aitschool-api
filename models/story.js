const basicModel = require("./index.js");

class storyModel extends basicModel {
  constructor(props = "stories") {
    super(props);
  }
}

module.exports = new storyModel();
