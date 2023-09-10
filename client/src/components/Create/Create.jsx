import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Styles from "./Create.module.css";
import { createPokemon, pokeError } from "../Redux/Actions";
import { MyModalError, SuccessModal } from "../Modals/MyModals";

export default function Create() {
  const types = useSelector((state) => state.types);
  const errorRedux = useSelector((state) => state.errors);
  const changeError = useSelector((state) => state.error_count);
  const pokemons = useSelector((state) => state.pokemons);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [there_Error, setThere_Error] = useState(true);
  const [success, setSuccess] = useState(true)
  const [form, setForm] = useState(false);
  const [pokemonCreated, setPokemonCreated] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    types: [],
    image: "/images/random.png",
  });

  useEffect(() => {
    setThere_Error(!there_Error);
    setForm(!form);
  }, [changeError]);

  useEffect(() => {
    setSuccess(!success)
  },[pokemons])

  const handleChange = async (event) => {
    const { name, value } = event.target;

    if (name === "type1" || name === "type2") {
      const pokeType = [...pokemonCreated.types];

      if (value !== "") {
        if (name === "type1") {
          pokeType[0] = value;
        } else if (name === "type2") {
          pokeType[1] = value;
        }
      } else {
        if (name === "type1") {
          pokeType[0] = "";
        } else if (name === "type2") {
          pokeType[1] = "";
        }
      }

      await setPokemonCreated({
        ...pokemonCreated,
        types: [...pokeType],
      });

      if (pokeType.includes("") || pokeType[0] === pokeType[1]) {
        await setErrors({
          ...errors,
          types: "Pokemon must contain 2 types",
        });
      } else {
        await setErrors({
          ...errors,
          types: null,
        });
      }
    }

    if (name !== "type1" && name !== "type2") {
      await setPokemonCreated({
        ...pokemonCreated,
        [name]: value,
      });
      const validationError = validate(name, value);
      await setErrors({
        ...errors,
        [name]: validationError,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, height, weight, hp, attack, defense, speed, types } =
      pokemonCreated;
    if (
      name &&
      height &&
      weight &&
      hp &&
      attack &&
      defense &&
      speed &&
      !types.includes("") &&
      types.length > 1 &&
      !hasErrors(errors)
    ) {
      dispatch(createPokemon(pokemonCreated));
    } else {
      dispatch(pokeError("You must complete the form"));
    }
  };

  const hasErrors = (errors) => {
    const keys = Object.keys(errors);
    return keys.some((key) => errors[key]);
  };

  const validate = (field, value) => {
    const nameRegex = /^[A-Za-z]+$/;
    const integerRegex = /^\d+$/;
    const errors = {};

    if (field === "name") {
      if (value.length === 0) {
        return (errors.name = "A name is required");
      }
      if (value.lenght < 3) {
        return (errors.name = "Name must contain at least 3 characters");
      }
      if (!nameRegex.test(value)) {
        return (errors.name = "The name must be only letters");
      }
      if (value.length > 20) {
        return (errors.name = "The name can have a maximum of 20 characters");
      }
    }

    if (field === "weight" || field === "height") {
      if (!value) {
        return (errors[field] = `A ${field} is required`);
      }
      if (isNaN(value)) {
        return (errors[field] = `${field} must be a valid number`);
      } else if (value <= 0) {
        return (errors[field] = `${field} must be greater than zero`);
      }
      if (!integerRegex.test(value)) {
        return (errors[field] = `${field} must be integer number`);
      }
    }

    if (
      field === "hp" ||
      field === "attack" ||
      field === "defense" ||
      field === "speed"
    ) {
      if (!value) {
        return (errors[field] = `A ${field} is required`);
      }
      if (!integerRegex.test(value)) {
        return (errors[field] = `${field} must be a valid integer`);
      }
      if (value > 100 || value <= 0) {
        return (errors[
          field
        ] = `${field} must be a valid integer between 1 and 100`);
      }
    }
    return null;
  };

  const onClose = () => {
    setThere_Error(false)
    setForm(true);
  };

  const onCloseSuccess = () => {
    setSuccess(false)
    setForm(true)
    navigate("/home")
  }

  return (
    <div className={Styles.container}>
      {there_Error && <MyModalError errors={errorRedux} onClose={onClose} />}
      {success && <SuccessModal 
      message="The pokemon has been created successfully"
      onCloseSuccess={onCloseSuccess}
      />}
      {form && (
        <>
          <button
            className={Styles.buttonBack}
            onClick={() => {
              navigate("/home");
            }}
          >
            BACK
          </button>

          <form className={Styles.createForm} onSubmit={handleSubmit}>
            <h2>
              Create your pokemon
            </h2>

            <input
              placeholder="NAME"
              className={errors.name ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="name"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.name}
            />
            <p>{errors && errors.name && <p>{errors.name}</p>}</p>

            <input
              placeholder="HEIGHT"
              className={errors.height ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="height"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.height}
            />
            <p>{errors && errors.height && <p>{errors.height}</p>}</p>

            <input
              placeholder="WEIGHT"
              className={errors.weight ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="weight"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.weight}
            />
            <p>{errors && errors.weight && <p>{errors.weight}</p>}</p>

            <input
              placeholder="HP"
              className={errors.hp ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="hp"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.hp}
            />
            <p>{errors && errors.hp && <p>{errors.hp}</p>}</p>

            <input
              placeholder="ATTACK"
              className={errors.attack ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="attack"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.attack}
            />
            <p>{errors && errors.attack && <p>{errors.attack}</p>}</p>

            <input
              placeholder="DEFENSE"
              className={errors.defense ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="defense"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.defense}
            />
            <p>{errors && errors.defense && <p>{errors.defense}</p>}</p>

            <input
              placeholder="SPEED"
              className={errors.speed ? Styles.inputTypeTextError : Styles.inputTypeText}
              name="speed"
              type="text"
              onChange={handleChange}
              value={pokemonCreated.speed}
            />
            <p>{errors && errors.speed && <p>{errors.speed}</p>}</p>

            <div className={Styles.selectContainer}>
            <label htmlFor="type1">CHOOSE A TYPE</label>
            <select name="type1" onChange={handleChange}>
              <option value="">Select a type</option>
              {types?.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>

            <label htmlFor="type2">CHOOSE A TYPE</label>
            <select name="type2" onChange={handleChange}>
              <option value="">Select a type</option>
              {types?.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
            </div>
            <p>{errors && errors.types && <p className={Styles.selectContainerP}>{errors.types}</p>}</p>

            <button className={Styles.buttonCreate} type="submit">
              CREATE
            </button>
          </form>
        </>
      )}
    </div>
  );
}
