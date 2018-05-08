const axios = require("axios");
const fbId = require("/root/fb.json").id;
const clientId = 159008188111833;
const redirectUrl = "https://privateblog.ru/api/auth/fb";

import RecordModel from "../record/RecordModel";
import UserModel from "../user/UserModel";
import Session from "../auth/SessionModel";

export default class Blog {
  async save(req, res) {
    const record = await RecordModel.create({ text: req.body.input });

    const session = await Session.findOne({ where: { sessionId: req.sessionID } });

    let user = {};

    if (session) {
      user = await UserModel.findOne({ where: { userId: session.userId } })
    }

    const userId = user.userId;
    const userRecords = user.recordIds;

    if (user.recordIds) {
      user.recordIds.push(record.id)
    } else {
      user.recordIds = [record.id];
    }

    await UserModel.update(
      { recordIds: user.recordIds },
      { where: { userId: userId } }
    );

    res.json({});
  }
}
