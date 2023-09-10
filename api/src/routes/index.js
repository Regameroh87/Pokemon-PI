const { Router } = require("express");
const axios = require("axios");
const findAllPokemons = require("../controllers/findAllpokemons");
const findpokemonById = require("../controllers/findpokemonById");
const findpokemonByName = require("../controllers/findpokemonByName");
const creatingPokemon = require("../controllers/creatingPokemon");
const findTypesFromDatabase = require("../controllers/findTypesFromDatabase");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemons", async (req, res) => {
  try {
    const allPokemons = await findAllPokemons();
    
    res.status(200).json(allPokemons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/pokemons/name", async (req, res) => {
  try {
    let { name } = req.query;

    if (name && typeof name === "string") {
      const pokemonByName = await findpokemonByName(name.toLowerCase());
      return res.status(200).json(pokemonByName);
    } else {
      return res
        .status(400)
        .json({ error: "The params 'name' must be a string of text validate" });
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get("/pokemons/:idPokemon", async (req, res) => {
  try {
    const { idPokemon } = req.params;

    const pokemonById = await findpokemonById(idPokemon);
    return res.status(200).json(pokemonById);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post("/pokemons", async (req, res) => {
  try {
    const { name, hp, image, attack, defense, speed, height, weight, types } =
      req.body;

    if (name && image && hp && attack && defense) {
      const newPokemon = {
        name,
        hp,
        attack,
        defense,
        speed,
        height,
        weight,
        types,
        image,
      };
      const created = await creatingPokemon(newPokemon);
      console.log(created)
      return res.status(200).json(created);

    } else {
      return res.status(400).json({ error: "Missing data" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/types", async (req, res) => {
  try {
    const types = await findTypesFromDatabase();
    return res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
