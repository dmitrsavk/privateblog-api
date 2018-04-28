const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

export const DB = {
  session: {},
  user: {}
};

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

    let options = {
      maxAge: 24 * 60 * 60 * 1000
    }

    res.cookie('session', req.sessionID, options)

    DB.session[req.sessionID] = user.data.id;
    DB.user[user.data.id] = { name: user.data.name }

    // const ava = await axios(`http://graph.facebook.com/${user.data.id}/picture?type=square`);
    res.redirect('/')
  }
}
