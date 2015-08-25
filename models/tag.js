'use strict'

module.exports = function(sequelize, DataTypes){
  var Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
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
  return Tag;
};
