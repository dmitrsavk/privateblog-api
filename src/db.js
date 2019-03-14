const Sequelize = require("sequelize");
const config = require("../config/config.db.json");

const options = {
  dialect: config.dialect,
  host: config.host,
  port: config.port,
  dialectOptions: {
    useUTC: false //for reading from database
  },
  timezone: "+03:00" //for writing to database
};

module.exports = new Sequelize(
  config.database,
  config.username,
  config.password,
  options
);
