'use strict'

module.exports = function(sequelize, DataTypes){
  var Profile = sequelize.define('Profile', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: true,
    classMethods: {
      //dostuff?!?!?!?!
    },
    instanceMethods: {
      //fine... boring comment.
    }
  });
  return Profile;
};
