const secret = require("/root/config.json");
const signature = require("cookie-signature");
const prefix = "s:";

import UserModel from "./UserModel";
import RecordModel from "../record/RecordModel";

export default class User {
  async get(req, res) {
    let sid = req.headers.sid;

    if (req.cookies && req.cookies.sessionId) {
      sid = req.cookies.sessionId.replace(prefix, "");
      sid = signature.unsign(sid, secret.secret);
    }

    let user = (await UserModel.findOne({ where: { sid } })) || {};

    if (user.recordIds) {
      user.dataValues.records = await RecordModel.findAll({
        where: { id: user.recordIds }
      });

      user.dataValues.records.sort((a, b) => b.createdAt - a.createdAt);
    }

    res.json(user);
  }

  async logout(req, res) {
    await req.session.destroy();

    res.redirect("/");
  }
}
