const basicModel = require('./index.js');

class pathModel extends basicModel {
  constructor(props = "paths") {
    super(props);
  }
}

module.exports = new pathModel();
