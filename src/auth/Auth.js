const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

import User from "../user/UserModel";
import Session from "../auth/SessionModel";

export default class Auth {
  async get(req, res) {
    const response = await axios(
      `https://graph.facebook.com/v2.12/oauth/access_token?client_id=${clientId}&redirect_uri=${redirectUrl}&client_secret=${fbId}&code=${
        req.query.code
      }`
    );

    const user = await axios(
      `https://graph.facebook.com/me?access_token=${response.data.access_token}`
    );

    req.session.save();

    await Session.create({ sessionId: req.sessionID, userId: user.data.id });
    await User.create({ userId: user.data.id, name: user.data.name });

    res.redirect("/");
  }
}
