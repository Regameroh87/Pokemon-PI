const { Pokemon, Type } = require("../db");

const creatingPokemon = async ({
  name,
  image,
  hp,
  attack,
  defense,
  speed,
  height,
  weight,
  types,
}) => {
  try {
    const [pokemon, created] = await Pokemon.findOrCreate({
      where: { name },
      defaults: {
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
      },
      include: Type,
    });

    if (created) {
      const pokemonTypes = [];

      for (const typeName of types) {
        const type = await Type.findOne({
          where: {
            name: typeName,
          },
        });
        if (type) {
          pokemonTypes.push(type);
        }
      }
      await pokemon.addTypes(pokemonTypes);
      await pokemon.reload();

      
      const typeNames = pokemonTypes.map((type) => type.name);

      
      const result = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        hp: pokemon.hp,
        attack: pokemon.attack,
        defense: pokemon.defense,
        speed: pokemon.speed,
        height: pokemon.height,
        weight: pokemon.weight,
        types: typeNames
      };
      console.log(result)
      return result;

    } else {
      throw new Error("The pokemon already exists");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = creatingPokemon;
