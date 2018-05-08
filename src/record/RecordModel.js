const db = require('../db');

import * as Sequelize from 'sequelize';

const RecordModel = db.define('records', {
	id: {
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
    field: 'id'
  },
	text: {
		type: Sequelize.TEXT,
		field: 'text'
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

export default RecordModel;
