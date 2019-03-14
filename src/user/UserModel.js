const db = require('../db');

import * as Sequelize from 'sequelize';

const UserModel = db.define('users', {
	id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    field: 'id'
  },
	name: {
		type: Sequelize.STRING,
		field: 'name'
  },
  userId: {
		type: Sequelize.STRING,
		field: 'user_id'
  },
  recordIds: {
    type: Sequelize.ARRAY(Sequelize.INTEGER),
    field: 'record_ids'
  },
  sid: {
    type: Sequelize.STRING,
    field: 'sid'
  },
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE
  },
  userIdVk: {
    field: 'user_id_vk',
    type: Sequelize.STRING
  }
});

export default UserModel;
