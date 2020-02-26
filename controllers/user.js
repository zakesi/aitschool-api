// const schema = require('async-validator').default;
const User = require("./../models/user.js");

const userController = {
  showMini: async function(req, res, next) {
    const id = res.locals.user_id;
    const users = await User.show({ id });
    const userInfo = users[0];
    res.json({ error_code: 0, data: { userInfo } });
  },
  index: async function(req, res, next) {},
  store: async function(req, res, next) {},
  update: async function(req, res, next) {},
  destroy: async function(req, res, next) {}
};

module.exports = userController;
