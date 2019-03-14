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
    const user = await UserModel.findOne({ where: { sid: req.sessionID } });

    if (user.recordIds) {
      user.recordIds.push(record.id)
    } else {
      user.recordIds = [record.id];
    }

    const result = await UserModel.update(
      { recordIds: user.recordIds },
      { where: { userId: user.userId } }
    );

    res.json(record);
  }

  async delete(req, res) {
    let records = [];

    await RecordModel.destroy({
      where: {
        id: req.body.id
      }
    });

    const user = await UserModel.findOne({ where: { sid: req.sessionID } });

    const index = user.recordIds.indexOf(req.body.id);

    if (~index) {
      user.recordIds.splice(index, 1);
    }

    await UserModel.update(
      { recordIds: user.recordIds },
      { where: { userId: user.userId } }
    );

    if (user.recordIds) {
      records = await RecordModel.findAll({
        where: { id: user.recordIds }
      });

      records.sort((a, b) => b.createdAt - a.createdAt)
    }

    res.json(records);
  }
}
