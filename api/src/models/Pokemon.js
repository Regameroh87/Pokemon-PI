const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, // Generará un UUID nuevo automáticamente al crear un registro
        primaryKey: true,
      },
    name: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false
    },
    hp:{
      type:DataTypes.STRING,
      allowNull:false
    },
    attack:{
      type:DataTypes.STRING,
      allowNull:false
    },
    defense:{
      type:DataTypes.STRING,
      allowNull:false
    },
    speed:{
      type:DataTypes.STRING
    },
    height:{
      type:DataTypes.STRING
    },
    weight:{
      type:DataTypes.STRING
    }
  },
  {
    timestamps:false
  });
};
