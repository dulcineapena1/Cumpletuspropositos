module.exports = function(sequelize, DataTypes) {
  var Categorias = sequelize.define("Categorias", {
    IdCategoria: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],
        is: ["^[a-z]+$", "i"]
      }
    }
  });
  return Categorias;
};
