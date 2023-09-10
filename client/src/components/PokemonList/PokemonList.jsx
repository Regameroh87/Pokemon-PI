import Styles from "./pokemonList.module.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "../Pagination/Pagination";
import {MyModalSearchPokemon, MyModalError, Loading}  from "../Modals/MyModals";


export default function PokemonList() {
  const pokemons = useSelector((state) => state.pokemons);
  const onePokemon = useSelector((state) => state.onePokemon);
  const errors = useSelector((state) => state.errors);
  const countErrors = useSelector((state) => state.error_count);

  const [loading, setLoading] = useState(true)
  const [pokeList, setPokeList] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [there_Error, setThere_Error] = useState(true);

  const totalPokemon = pokemons?.length;
  
  const pokemonForPage = 12; // CANT DE POKEMONES POR PAG
  const [currentPage, setCurrentPage] = useState(1); // PAG ACTUAL

  const lastIndex = currentPage * pokemonForPage; // LA PAG ACTUAL LA MULTIPLICA POR LOS PRODUCTOS POR PAG(EJ PAG 1 X 12 POKEMONS)
  const firstIndex = lastIndex - pokemonForPage; // RESTA LASTINDEX MENOS POKEMON POR PAG (EJ 12 -12 )... FIRSTINDEX=0 LASTINDEX=12
  
  useEffect(() => {
    setTimeout(() => {
      setPokeList(true);
      setLoading(false)
    }, 2000);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemons]);

  useEffect(() => {
    setModalIsOpen(!modalIsOpen);
  }, [onePokemon]);

  useEffect(() => {
    setThere_Error(!there_Error)
  },[countErrors])

  const onClose = () => {
    setLoading(false)
    setModalIsOpen(false);
    setThere_Error(false);
  };

  return (
    <>
    {loading &&
      <Loading onClose={onClose}/>
    }
    {there_Error &&
     <MyModalError
     errors={errors}
     onClose = {onClose}
     />}
     {modalIsOpen &&
      <MyModalSearchPokemon
      onePokemon = {onePokemon}
      onClose = {onClose}
      />}
  
      {pokeList && (
      <div>
      <div className={Styles.container}>
        {pokemons
          ?.map((pokemon) => (
            <div
              className={`${Styles.card} ${
                pokemon.types && pokemon.types.length > 0
                  ? Styles[pokemon.types[0]]
                  : ""
              }`}
              key={pokemon.id}
            >
              <div className={Styles.divContainer} style={{ height: "16.5%" }}>
              {pokemon.name && <h2>{pokemon.name.toUpperCase()}</h2>}
              </div>
              <div
                className={Styles.divContainer}
                style={{
                  height: "33.33%",
                  marginTop: "40px",
                  marginBottom: "40px",
                }}
              >
                <Link to={`/detail/${pokemon.id}`}>
                  <img src={pokemon.image} alt={pokemon.name} />
                </Link>
              </div>
              <div className={Styles.types} style={{ height: "16.5%" }}>
                {pokemon.types &&
                  pokemon.types.map((type) => (
                    <img
                      key={type}
                      src={`pokemonImageTypes/${type}.png`}
                      alt={pokemon.name}
                    />
                  ))}
              </div>
            </div>
          ))
          .slice(firstIndex, lastIndex)}
      </div>

      <Pagination
        pokemonForPage={pokemonForPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPokemon={totalPokemon}
      />
      </div>)}
    </>
  );
}
