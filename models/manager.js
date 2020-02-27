const basicModel = require("./index.js");

class pathCourseModel extends basicModel {
  constructor(props = "manager") {
    super(props);
  }
}

module.exports = new pathCourseModel();
