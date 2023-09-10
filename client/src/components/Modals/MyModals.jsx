import styles from "./MyModals.module.css"

export function MyModalSearchPokemon({ onePokemon, onClose }) {

  return (
    <div className={styles.modalBackground}>
    <div className={styles.container}>

      <div className={styles.containerImage}>
        <img src={onePokemon.image} alt={onePokemon.name} />
      </div>

      <div className={styles.containerInfo}>

        <button onClick={onClose}>
          x
        </button>

        {onePokemon.name && <h1>{onePokemon.name.toUpperCase()}</h1>}
            <h4>#ID:   {onePokemon.id}</h4>

        <figure>
          <img src="/images/hp.png" alt="life" />
          <figcaption>HP {onePokemon.hp}</figcaption>
        </figure>

        <figure>
          <img src="/images/attack.png" alt="attack" />
          <figcaption>ATTACK {onePokemon.attack}</figcaption>
        </figure>

        <figure>
          <img src="/images/defense.png" alt="defense" />
          <figcaption>DEFENSE {onePokemon.defense}</figcaption>
        </figure>

        <figure>
          <img src="/images/speed.png" alt="speed" />
          <figcaption>SPEED {onePokemon.speed}</figcaption>
        </figure>

        <figure>
          <img src="/images/height.png" alt="height" />
          <figcaption>HEIGHT {onePokemon.height}</figcaption>
        </figure>

        <figure>
          <img src="/images/weight.png" alt="weight" />
          <figcaption>WEIGHT {onePokemon.weight}</figcaption>
        </figure>

        <div className={styles.types}>
          {onePokemon.types &&
            onePokemon.types.length > 0 &&
            onePokemon.types.map((type) => (
                <img
                key={type}
                src={`pokemonImageTypes/${type}.png`}
                alt={onePokemon.name}
                />
                ))}

        </div>
      </div>
    </div>
    </div>
  );
}


export function MyModalError ({errors, onClose }) {
  return (
      <div className={styles.modalBackground}>
          <div className={styles.containerError}>
              <div className={styles.errorImage}>
                  <img src="/images/atencion.png"/>
              </div>
              <div className={styles.containerErrorInfo}>
                  <h1>{errors}</h1>
                  <button onClick={onClose}>CLOSE</button>
              </div>
          </div>
      </div>
  )
}

export function SuccessModal ({message, onCloseSuccess}) {
  return (
      <div className={styles.modalBackground}>
          <div className={styles.containerError}>
              <div className={styles.successImage} >
                  <img src="/images/success.png"/>
              </div>
              <div className={styles.containerSuccessInfo}>
                  <h1>{message}</h1>
                  <button onClick={onCloseSuccess}>BACK TO HOME</button>
              </div>
          </div>
      </div>
  )
}

export function Loading () {
  return (
    <div className={styles.loading}>
      <img src="/images/pikachuRun2.gif"/>
      <img  src="/images/loading.gif"/>
    </div>
  )
}

export function LoadingTwo () {
  return (
    <div className={styles.loadingTwo}>
      <img src="/images/loadingColor.gif"/>
    </div>
  )
}

module.export={
  MyModalSearchPokemon,
  MyModalError,
  Loading,
  SuccessModal
}