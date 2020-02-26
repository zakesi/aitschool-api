const schema = require("async-validator").default;
const Manager = require("./../models/manager.js");
const servicesUser = require("./../services/user");
const rolePermission = require("./../models/role_permission.js");
const managerController = {
  index: async function(req, res, next) {
    try {
      const ManagerArr = await Manager.all()
        .whereNull("isdeleted")
        .leftJoin("roles", "roles.id", "manager.roles_id")
        .select("manager.*", { roles_name: "roles.name" });
      res.json({ error_code: 0, data: { ManagerArr } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  details: async function(req, res, next) {
    try {
      const id = req.params.id;
      if (!id)
        return res.json({ error_code: 1, message: "数据不足，请重新选择" });
      const ManagerData = await Manager.where({ id }).whereNull("isdeleted");
      res.json({ error_code: 0, data: { ManagerData: ManagerData[0] } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  store: async function(req, res, next) {
    try {
      const name = req.body.name;
      const phone = req.body.phone;
      const password = req.body.password;
      const roles_id = req.body.roles_id;
      const validator = new schema({
        phone: { type: "number", required: true },
        roles_id: { type: "number", required: true },
        name: { type: "string", required: true },
        password: { type: "string", required: true }
      });
      const params = { name, phone, password, roles_id };
      await validator.validate(params);
      let ids = await Manager.insert(params);
      res.json({ error_code: 0, data: { id: ids[0] }, message: "创建成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  login: async function(req, res, next) {
    try {
      const phone = Number(req.body.phone);
      const password = req.body.password;
      const validator = new schema({
        phone: { type: "number", required: true },
        password: { type: "string", required: true }
      });
      const params = { phone, password };
      await validator.validate(params);
      let data = await Manager.where(params).whereNull("isdeleted");
      if (!data.length) {
        return res.json({ error_code: 1, message: "账号或密码错误" });
      }
      let token = servicesUser.encrypt({ manager_id: data[0].id });
      res.json({ error_code: 0, data: token, message: "登陆成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  getPermissionArr: async function(req, res, next) {
    try {
      let token = req.body.token;
      if (!token)
        return res.json({ error_code: 1, message: "缺少数据，请重新登陆" });
      let data = servicesUser.decode(token);
      let managerData = await Manager.where({
        id: data.data.manager_id
      }).whereNull("isdeleted");
      if (!managerData.length)
        return res.json({ error_code: 1, message: "缺少数据，请重新登陆" });
      let permissionArr = await rolePermission
        .where({ role_id: managerData[0].roles_id })
        .leftJoin(
          "permissions",
          "permissions.id",
          "role_permissions.permission_id"
        )
        .select({ permissions_slug: "permissions.slug" });
      res.json({ error_code: 0, data: { permissionArr } });
    } catch (e) {
      console.log(e);
      res.json({ error_code: 1, message: e.message });
    }
  },
  update: async function(req, res, next) {
    try {
      const id = req.params.id;
      const name = req.body.name;
      const phone = Number(req.body.phone);
      const password = req.body.password;
      const roles_id = Number(req.body.roles_id);
      const validator = new schema({
        roles_id: { type: "number", required: true },
        phone: { type: "number", required: true },
        name: { type: "string", required: true },
        password: { type: "string", required: true }
      });
      if (!id)
        return res.json({ error_code: 1, message: "数据不足，请重新选择" });
      const params = { name, phone, password, roles_id };
      await validator.validate(params);
      await Manager.update(id, params);
      res.json({ error_code: 0, message: "编辑成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      if (!id)
        return res.json({ error_code: 1, message: "数据不足，请重新选择" });
      await Manager.update(id, { isdeleted: 0 });
      res.json({ error_code: 0, message: "删除成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  }
};

module.exports = managerController;
