module.exports = function(sequelize, DataTypes) {
  var Usuario = sequelize.define("Usuario", {
    IdUsuario: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", "i"],
        len: [1, 50]
      }
    },
    Apaterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", "i"],
        len: [1, 50]
      }
    },
    Amaterno: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: ["^[a-z]+$", "i"],
        len: [1, 50]
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1, 50]
      }
    },
    Telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"],
        len: [1, 15]
      }
    },
    Usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    Contrasena: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    }
  });

  Usuario.associate = function(models) {
    Usuario.hasMany(models.Propositos, {
      onDelete: "cascade"
    });
  };

  return Usuario;
};
