module.exports = function(sequelize, DataTypes) {
  var ToDos = sequelize.define("ToDos", {
    IdTodo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 250]
      }
    },
    IdProposito: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
      }
    },
    IdStatus: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
      }
    },
    Obligatorio: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    start: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    end: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  });

  return ToDos;
};
