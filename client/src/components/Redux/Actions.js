import axios from 'axios'

export const ADD_POKEMONS = "ADD_POKEMONS";
export const ADD_TYPES = "ADD_TYPES";
export const FILTER_TYPES = "FILTER_TYPES";
export const POKEMONFOUND = "POKEMONFOUND";
export const POKE_ERROR = "POKE_ERROR";
export const POKEMON_CREATED = "POKEMON_CREATED";
export const ORDER = "ORDER";
export const ORIGIN = "ORIGIN"

export const addPokemons = () => {
  return async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:3001/pokemons")
            return dispatch({
                type:ADD_POKEMONS,
                payload:data
            })  
    } catch (error) {
      return dispatch({
        type:POKE_ERROR,
        payload: error.message
      })
    }
   }
}

export const addTypes = () => {
  return async (dispatch) => {
    try {
        const { data } = await axios.get("http://localhost:3001/types")
        return dispatch({
            type:ADD_TYPES,
            payload:data
        })    
    } catch (error) {
        return dispatch({
          type:POKE_ERROR,
          payload: error.message
        })
    }
    
  }
};

export const filtersPokemon = (selectTypes) => {
  return {
    type: FILTER_TYPES,
    payload:selectTypes
  };
};

export const orderPokemon = (orderValue) => {
  return {
    type: ORDER,
    payload:orderValue
  };
};

export const pokeOrigin = (origin) => {
  return {
    type: ORIGIN,
    payload:origin
  };
};


export const searchByName =  (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons/name?name=${name}`)
      return dispatch({
        type:POKEMONFOUND,
        payload:data
    })

    } catch (error) {
      return dispatch({
        type:POKE_ERROR,
        payload: error.message
      })
    }
  }
}

export const searchById =  (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`http://localhost:3001/pokemons/${id}`)
      return dispatch({
        type:POKEMONFOUND,
        payload:data
    })

    } catch (error) {
      return dispatch({
        type:POKE_ERROR,
        payload: error.message
      })
    }
  }
}

export const createPokemon = (pokemon) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('http://localhost:3001/pokemons',pokemon)
      return dispatch({
        type:POKEMON_CREATED,
        payload: data
      }) 
    } catch (error) {
      return dispatch({
        type:POKE_ERROR,
        payload: error.message
      })
    }
  }
}

export const pokeError = (errorMessage) => {
  
  return ({
    type:POKE_ERROR,
    payload: errorMessage
  })
}