const axios = require("axios");
const vkId = require("/root/fb.json").vk;
const redirectVk = "https://privateblog.ru/api/auth/vk";

import User from "../user/UserModel";

export default class Auth {
  async get(req, res) {
    const sid = req.headers.sid;
    const user = req.body;

    if (!(await User.findOne({ where: { userId: user.id } }))) {
      await User.create({
        userId: user.id,
        name: user.name,
        sid
      });
    } else {
      await User.update({ sid }, { where: { userId: user.id } });
    }

    res.end();
  }

  async getVk(req, res) {
    const sid = req.headers.sid;
    const user = req.body;

    if (!(await User.findOne({ where: { userIdVk: user.id.toString() } }))) {
      await User.create({
        userIdVk: user.id.toString(),
        name: `${user.first_name} ${user.last_name}`,
        sid
      });
    } else {
      User.update({ sid }, { where: { userIdVk: user.id.toString() } });
    }

    res.end();
  }
}
