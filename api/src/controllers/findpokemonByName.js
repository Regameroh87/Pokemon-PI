const { Pokemon } = require("../db");
const axios = require("axios");

const findpokemonByName = async (name) => {
  
  try {
    const pokemonDb = await Pokemon.findOne({
      where:{name:name}
    });

    if (pokemonDb) {

      return pokemonDb;

    } else {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      
      if (data) {
        const pokemonApi = {
          id: data.id,
          name: data.name,
          image: data.sprites.other.dream_world.front_default,
          hp: data.stats[0].base_stat,
          attack: data.stats[1].base_stat,
          defense: data.stats[2].base_stat,
          speed: data.stats[5].base_stat,
          height: data.height,
          weight: data.weight,
          types:data.types.map((e) => e.type.name)
        };
        
        return pokemonApi;

      } else {
        throw new Error("No data returned from PokeAPI")
      }
    }
  } catch (error) {
      throw new Error("Pokemon not found");
  }
};

module.exports = findpokemonByName;
