'use strict'

module.exports = function(sequelize, DataTypes){
  var Folder = sequelize.define('Folder', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    folderName: {
      type: DataTypes.STRING,
      allowNull: false
    }//,
    // children: {
    //   type: DataTypes.STRING, <-- array?
    //   allowNull: false
    // }
  },
  {
    timestamps: true,
    classMethods: {
      //dostuff?!?!?!?!
      //kill the children
    },
    instanceMethods: {
      //fine... boring comment.
    }
  });
  return Folder;
};
