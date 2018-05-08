const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

import Session from "../auth/SessionModel";
import UserModel from "./UserModel";
import RecordModel from '../record/RecordModel'

export default class User {
  async get(req, res) {
    const session = await Session.findOne({ where: { sessionId: req.sessionID } });

    let user = {};

    if (session) {
      user = await UserModel.findOne({ where: { userId: session.userId } });

      if (user.recordIds) {
        user.dataValues.records = await RecordModel.findAll({where: {id: user.recordIds}})
      }
    }

    res.json(user);
  }

  async logout(req, res) {
    await req.session.destroy();

    res.redirect("/");
  }
}
