'use strict'

require('dotenv').load();

var Sequelize = require('sequelize');
var sequelize = new Sequelize(
  process.env.SQL_DB,
  process.env.SQL_USER,
  process.env.SQL_PASS,
  {
    dialect: 'postgres',
    //do we need to change this for heroku/when it's deployed?!
    hostname: 'localhost',
    port: 5432
  }
);

var models = {
  'sequelize': sequelize,
  User: sequelize.import('./user.js')
};

module.exports = models;
