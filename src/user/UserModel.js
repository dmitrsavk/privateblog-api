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
  createdAt: {
    field: 'created_at',
    type: Sequelize.DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: Sequelize.DATE
  },
});

export default UserModel;
