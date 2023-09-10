const axios = require('axios')
const { Pokemon, Type } = require("../db");

const getAllPokemons = async () => {
  
  try {
    const apiLimit = 100;
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${apiLimit}`);
    const apiPokemons = data.results;

    const promises = apiPokemons.map((poke) => axios.get(poke.url))
    const responses = await Promise.all(promises);
    const pokemonData = responses.map(({data}) =>  ({
      id:data.id,
      name:data.name,
      image:data.sprites.other.dream_world.front_default,
      hp:data.stats[0].base_stat,
      attack:data.stats[1].base_stat,
      defense:data.stats[2].base_stat,
      speed:data.stats[5].base_stat,
      height:data.height,
      weight:data.weight,
      types:data.types.map((e) => e.type.name)
    }));

    
    const dbPokemons = await (await Pokemon.findAll({ 
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: [],
        }
      }
    })).map(pokemon => {
      const json = pokemon.toJSON();
      return{
        ...json,
        types: json.types.map( type => type.name)
      }
    });
    
    
    if (dbPokemons) {
        return [...pokemonData,...dbPokemons];
    } else {
        return pokemonData
    }

  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = getAllPokemons;
