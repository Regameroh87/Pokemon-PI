import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../Detail/Detail.module.css";
import { useSelector, useDispatch } from "react-redux";
import { searchById } from "../Redux/Actions";
import { MyModalError, LoadingTwo } from "../Modals/MyModals";

export default function Detail() {
  
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [there_error, setThere_Error] = useState(true);
  const [pokeDetail, setPokeDetail] = useState(false);
  const [loading, setLoading] = useState(true);
  const pokemon = useSelector((state) => state.onePokemon);
  const errors = useSelector((state) => state.errors);

  useEffect(() =>{
    setTimeout(()=>{
      setLoading(false);
      setPokeDetail(true);
    },2000)
  },[])
  
  useEffect(()=>{
    dispatch(searchById(id))
  },[id])

  useEffect(()=>{
    setThere_Error(!there_error)
  },[errors])



  const onClose = () => {
    setThere_Error(false)
  }

  return (
    <div className={styles.container}>
      {loading && 
      <LoadingTwo
      />}
      {there_error && 
      <MyModalError
      errors={errors}
      onClose={onClose}
       />}
      {pokeDetail && (
      <div className={styles.pokemoncard}>
        <div className={styles.image}>
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={styles.image}
        />
        </div>
        <div className={styles.divData}>
          {pokemon.name && <h2>{pokemon.name.toUpperCase()}</h2>}
          <p>ID {pokemon.id}</p>
          <p>HP {pokemon.hp}</p>
          <p>ATTACK {pokemon.attack}</p>
          <p>DEFENSE {pokemon.defense}</p>
          <p>SPEED {pokemon.speed}</p>
          <p>HEIGHT {pokemon.height}</p>
          <p>WEIGHT {pokemon.weight}</p>
          <div className={styles.types}>
          {pokemon.types &&
                  pokemon.types.map((type) => (
                    <img
                      key={type}
                      src={`/pokemonImageTypes/${type}.png`}
                      alt={pokemon.name}
                    />
                  ))}
        </div>
        <button
        className={styles.buttonBack}
        onClick={() => {
          navigate("/home");
        }}
      >
        BACK
      </button>
        </div> 
      </div>)}
    
    </div>
  );
}
