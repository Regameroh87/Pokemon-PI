import {
  ADD_POKEMONS,
  ADD_TYPES,
  FILTER_TYPES,
  ORDER,
  POKEMONFOUND,
  POKE_ERROR,
  POKEMON_CREATED,
  ORIGIN
} from "./Actions";

const initialState = {
  errors: "",
  error_count: 0,
  allpokemons: [],
  onePokemon: [],
  pokemons: [],
  types: [],
};

const filterPokeDatabaseFromApi = (payload, state) => {
 
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  let result = [];

    if (payload === "All") {
      result = state.allpokemons;
    } else if (payload === "Created") {
      result = state.allpokemons.filter((pokemon) => uuidRegex.test(pokemon.id));
    } else if (payload === "Pokeapi") {
      result = state.allpokemons.filter((pokemon) => !uuidRegex.test(pokemon.id));
    }
    return result
  }

const pokeOrden = (payload, state) => {

const Pokemons = [...state.pokemons]

  switch (payload) {
    case "pokedex":
        return state.allpokemons
    case "ascendente":
      return Pokemons.sort((a, b) => a.name.localeCompare(b.name));
    case "descendente":
      return Pokemons.sort((a, b) => b.name.localeCompare(a.name));
    case "lowestattack":
      return Pokemons.sort((a, b) => parseInt(a.attack) - parseInt(b.attack)).slice();
    case "highestattack":
      return Pokemons.sort((a, b) => parseInt(b.attack) - parseInt(a.attack)).slice();
    default:
      return Pokemons;
  }
};

const pokeFilterTypes = (payload, state) => {
  
  if (payload === "alltypes") {
    return [...state.allpokemons];
  } else {
    const filteredPokemons = state.allpokemons.filter((pokemon) => {
      return pokemon.types.includes(payload);
    });
    return filteredPokemons;
  }
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_POKEMONS:
      return {
        ...state,
        allpokemons: payload,
        pokemons: payload,
      };

    case ADD_TYPES:
      return {
        ...state,
        types: payload,
      };

    case FILTER_TYPES:
      const filterTypes = pokeFilterTypes(payload, state);
      return {
        ...state,
        pokemons: filterTypes,
      };

    case ORDER:
      const orderPokemons = pokeOrden(payload, state)
      return {
        ...state,
        pokemons: orderPokemons
      }

    case ORIGIN:
      const pokeOrigin =filterPokeDatabaseFromApi(payload, state)
      return {
        ...state,
        pokemons:pokeOrigin
      }  

    case POKEMONFOUND:
      return {
        ...state,
        onePokemon: payload,
      };

    case POKE_ERROR:
      const countError = state.error_count + 1;
      return {
        ...state,
        errors: payload,
        error_count: countError,
      };

    case POKEMON_CREATED:
      return {
        ...state,
        allpokemons: [...state.allpokemons, payload],
        pokemons: [...state.pokemons, payload],
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
