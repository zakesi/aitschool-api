const basicModel = require("./index.js");

class pathCourseModel extends basicModel {
  constructor(props = "path_courses") {
    super(props);
  }
}

module.exports = new pathCourseModel();
