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
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: true
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
