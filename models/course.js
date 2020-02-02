const basicModel = require('./index.js');

class courseModel extends basicModel {
  constructor(props = "courses") {
    super(props);
  }
}

module.exports = new courseModel();
