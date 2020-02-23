const basicModel = require('./index.js');
const config = require('./../knexfile.js');
const knex = require('knex')(config);

class userModel extends basicModel {
  constructor(props = "users") {
    super(props);
  }
}

module.exports = new userModel();
