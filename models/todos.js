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
    IdUsuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
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
      defaultValue: false,
      allowNull: false,
      validate: {
        not: ["^[a-z]+$", "i"]
      }
    },
    // Obligatorio: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false
    // },    ESTO ES PARA UNA SIGUIENTE FASE, MARCAR SI UN TODO ES OBLIGATORIO HACERLO O NO
    recurrente: {
      type: DataTypes.STRING,//estaba como integer
      allowNull: false
    },
    start: {
      type: DataTypes.STRING,
      allowNull: false
    },
    end: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  ToDos.associate = function (models) {
    models.ToDos.belongsTo(models.Propositos,{
      onDelete: "CASCADE"
      
      
    });
  };

  return ToDos;
};
