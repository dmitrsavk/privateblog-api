const Sequelize = require("sequelize");
const config = require("../config/config.db.json");

const options = {
  dialect: config.dialect,
  host: config.host,
  port: config.port
};

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  options
);
