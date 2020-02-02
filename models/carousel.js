const basicModel = require('./index.js');

class carouselModel extends basicModel {
  constructor(props = "carousels") {
    super(props);
  }
}

module.exports = new carouselModel();
