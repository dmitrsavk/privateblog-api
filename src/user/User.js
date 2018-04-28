const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

import { DB } from '../auth/Auth';

export default class User {
  async get(req, res) {
    const id = DB.session[req.cookies.session];
    const data = id && DB.user[id] || {};
    res.json(JSON.stringify(data));
  }
}
