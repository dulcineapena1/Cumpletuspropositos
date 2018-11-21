module.exports = function(sequelize, DataTypes) {
  var Propositos = sequelize.define("Propositos", {
    IdProposito: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Proposito: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    IdCat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
      }
    },
    IdUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
      }
    },
    Comentarios: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isAlphanumeric: true,
        len: [1, 500]
      }
    }
  });
  return Propositos;
};
