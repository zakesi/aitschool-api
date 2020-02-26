const schema = require("async-validator").default;
const Role = require("./../models/role.js");
const userRole = require("./../models/user_role.js");
const rolePermission = require("./../models/role_permission.js");

const roleController = {
  index: async function(req, res, next) {
    try {
      const roles = await Role.all();
      res.json({ error_code: 0, data: { roles } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  store: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const validator = new schema({
      name: { type: "string", required: true },
      description: { type: "string", required: true }
    });
    const params = { name, description };
    try {
      await validator.validate(params);
      const ids = await Role.insert(params);
      res.json({ error_code: 0, data: { id: ids[0] }, message: "创建成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  update: async function(req, res, next) {
    const name = req.body.name;
    const description = req.body.description;
    const validator = new schema({
      name: { type: "string", required: true },
      description: { type: "string", required: true }
    });
    const params = { name, description };
    try {
      const id = req.params.id;
      await validator.validate(params);
      await Role.update(id, params);
      res.json({ error_code: 0, message: "编辑成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  destroy: async function(req, res, next) {
    try {
      const id = req.params.id;
      await Role.delete({ id });
      await userRole.delete({ role_id: id });
      await rolePermission.delete({ role_id: id });
      res.json({ error_code: 0, message: "删除成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  getUsers: async function(req, res, next) {
    try {
      const role_id = req.params.id;
      const users = await userRole
        .knex()
        .where({ role_id })
        .leftJoin("users", "user_roles.user_id", "users.id")
        .column("users.id", "users.phone", "users.nickname");
      res.json({ error_code: 0, data: { users } });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  storeUsers: async function(req, res, next) {
    const user_id = Number(req.body.user_id);
    const validator = new schema({
      user_id: { type: "number", required: true }
    });
    const params = { user_id };
    const role_id = req.params.id;
    try {
      await validator.validate(params);
      await userRole.insert({ user_id, role_id });
      res.json({ error_code: 0, message: "创建成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  destoryUsers: async function(req, res, next) {
    const user_id = Number(req.body.user_id);
    const validator = new schema({
      user_id: { type: "number", required: true }
    });
    const params = { user_id };
    const role_id = req.params.id;
    try {
      await validator.validate(params);
      await userRole.delete({ user_id, role_id });
      res.json({ error_code: 0, message: "删除成功" });
    } catch (e) {
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  },
  getPermissions: async function(req, res, next) {
    try {
      const role_id = req.params.id;
      const roles = await Role.where({ id: role_id });
      const permissions = await rolePermission.where({ role_id });
      const permissionsTransform = permissions.map(data => data.permission_id);
      res.json({
        error_code: 0,
        data: { permissions: permissionsTransform, roles: roles[0] }
      });
    } catch (e) {
      res.json({ error_code: 1, message: e.message });
    }
  },
  updatePermissions: async function(req, res, next) {
    const permissions = req.body.permissions;
    console.log(permissions);
    const validator = new schema({
      permissions: { type: "array", required: true }
    });
    try {
      await validator.validate({ permissions });
      const role_id = req.params.id;
      const originPermissions = await rolePermission.where({ role_id });
      const originIds = originPermissions.map(data => data.permission_id);
      const removeIds = originIds.filter(data => !permissions.includes(data));
      const insertIds = permissions.filter(data => !originIds.includes(data));
      if (removeIds.length) {
        await rolePermission
          .knex()
          .whereIn("permission_id", removeIds)
          .andWhere("role_id", role_id)
          .del();
      }
      if (insertIds.length) {
        await rolePermission.insert(
          insertIds.map(data => {
            return {
              permission_id: data,
              role_id: role_id
            };
          })
        );
      }
      res.json({ error_code: 0, message: "编辑成功" });
    } catch (e) {
      console.log(e);
      res.json({ error_code: 1, message: e.message || e.errors });
    }
  }
};

module.exports = roleController;
