const { DataTypes, Model } = require("sequelize");
const sequelize = require("../lib/sequelize");

class Usuarios extends Model {}

Movie.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rol: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: "Usuario",
  }
);

Usuario.sync();

module.exports = Usuario;