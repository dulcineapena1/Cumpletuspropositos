module.exports = function(sequelize, DataTypes) {
  var Status = sequelize.define(
    "Status",
    {
      IdStatus: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 10],
          is: ["^[a-z]+$", "i"]
        }
      }
    },
    {
      freezeTableName: true,
      tableName: "Status"
    }
  );

  return Status;
};
