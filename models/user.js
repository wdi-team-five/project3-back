module.exports = function(sequelize, DataTypes){
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    localName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    localPass: {
      type: DataTypes.STRING,
      allowNull: false,
      unqie: false
    }
  },
  {
    timestamps: true,
    classMethods: {
      //dostuf?!?!?!?!
    },
    instanceMethods: {
      //fine... boring comment.
    }
  });
  return User;
};
