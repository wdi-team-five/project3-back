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
  User: sequelize.import('./user.js'),
  Profile: sequelize.import('./profile.js'),
  Element: sequelize.import('./element.js')
};

models.Profile.belongsTo(models.User);
models.User.hasOne(models.Profile);

models.Element.belongsTo(models.User);
models.User.hasMany(models.Element);

module.exports = models;
