'use strict'

module.exports = function(sequelize, DataTypes){
  var Element = sequelize.define('Element', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mongoId: {
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
  return Element;
};
