const basicModel = require("./index.js");

class chapterModel extends basicModel {
  constructor(props = "chapters") {
    super(props);
  }
}

module.exports = new chapterModel();
