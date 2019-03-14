const db = require("../db");

import * as Sequelize from "sequelize";

const RecordModel = db.define("image", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    field: "id"
  },
  userId: {
    type: Sequelize.TEXT,
    field: "user_id"
  },
  userIdVk: {
    type: Sequelize.TEXT,
    field: "user_id_vk"
  },
  image: {
    field: 'image',
    type: Sequelize.BLOB('long')
  },
  createdAt: {
    field: "created_at",
    type: Sequelize.DATE
  },
  updatedAt: {
    field: "updated_at",
    type: Sequelize.DATE
  }
});

export default RecordModel;
