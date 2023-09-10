const axios = require("axios");
const { Type } = require("../db");

const findTypesFromDatabase = async () => {
  try {
    let typesDb = await Type.findAll();
    
    if (typesDb.length < 1) {
      
      const { data } = await axios.get('https://pokeapi.co/api/v2/type');
      const dataTypesApi = data.results;

      await Type.bulkCreate(dataTypesApi)
      
      typesDb = await Type.findAll();
        
    }

    return typesDb ;

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = findTypesFromDatabase;
