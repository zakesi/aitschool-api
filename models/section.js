const basicModel = require('./index.js');

class sectionModel extends basicModel {
  constructor(props = "sections") {
    super(props);
  }
}

module.exports = new sectionModel();
