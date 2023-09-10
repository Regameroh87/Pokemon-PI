import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { filtersPokemon, orderPokemon, searchByName, searchById, pokeOrigin } from "../Redux/Actions";
import Styles from "./Nav.module.css";

export const Nav = () => {
  const types = useSelector((state) => state.types);


  const [pokeSearch, setPokeSearch] = useState("");
  const [selectOrder, setSelectOrder] = useState("pokedex");
  const [selectTypes, setSelectTypes] = useState("alltypes");
  const [pokemonOrigin, setPokemonOrigin] = useState("All");

  const dispatch = useDispatch();
  
  const handlerFilters = (event) => {
    const name = event.target.name

    if (name === "types") {
    setSelectTypes(event.target.value)
    dispatch(filtersPokemon(event.target.value))
    
    }
    if (name === "pokeapi") {
      setPokemonOrigin(event.target.value)
      dispatch(pokeOrigin(event.target.value))
    }
    if (name === "order") {
      setSelectOrder(event.target.value)
      dispatch(orderPokemon(event.target.value))
    }
  };

 const handleChange = (event) => {
    setPokeSearch(event.target.value);
  };

  const onSearch = (pokeSearch) => {
    if (pokeSearch) {
      const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
      const uuid = uuidRegex.test(pokeSearch);

      if (!isNaN(pokeSearch) || uuid) {
        dispatch(searchById(pokeSearch));
      } else {
        dispatch(searchByName(pokeSearch));
      }
      return setPokeSearch("");
    }
  };

  return (
    <nav className={Styles.nav}>
      <div className={Styles.div}>
        <select name= "types" className={Styles.select} onChange={handlerFilters}>
          <option value="alltypes">All types</option>
          {types.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <select name= "pokeapi" className={Styles.select} onChange={handlerFilters}>
          <option value="All">All</option>
          <option value="Pokeapi">Pokeapi</option>
          <option value="Created">Created</option>
        </select>

        <select name="order" className={Styles.select} onChange={handlerFilters}>
          <option value="pokedex">Pokedex</option>
          <option value="ascendente">A - Z</option>
          <option value="descendente">Z - A</option>
          <option value="highestattack">Highest Attack</option>
          <option value="lowestattack">Lowest Attack</option>
        </select>
      </div>

      <div className={Styles.div}>
        <img
          src="images/logoPokemon.png"
          style={{ width: "380px", height: "150px" }}
        />
      </div>

      <div className={Styles.div}>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            onSearch(pokeSearch);
          }}
        >
          <input
            className={Styles.input}
            onChange={handleChange}
            value={pokeSearch}
            style={{ marginRight: "1.5rem" }}
            placeholder="Search pokemon by id or name"
          />
          <button className={Styles.button} type="submit">
            SEARCH
          </button>
        </form>

        <Link to="/create">
          <button className={Styles.button}>CREATE</button>
        </Link>
      </div>
    </nav>
  );
};
