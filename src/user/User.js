const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

import Session from "../auth/SessionModel";
import UserModel from "./UserModel";

export default class User {
  async get(req, res) {
    const session = await Session.findOne({ where: { sessionId: req.sessionID } });

    let user = {};

    if (session) {
      user = await UserModel.findOne({ where: { userId: session.userId } })
    }

    res.json(user);
  }

  async logout(req, res) {
    await res.session.destroy();

    res.redirect("/");
  }
}
