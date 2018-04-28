const db = require('../db');

import * as Sequelize from 'sequelize';

const SessionModel = db.define('sessions', {
	id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    field: 'id'
  },
	sessionId: {
		type: Sequelize.STRING,
		field: 'session_id'
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

export default SessionModel;
