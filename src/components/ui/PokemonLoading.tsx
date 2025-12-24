import Lottie from 'lottie-react';
import pokeballAnimation from '../../assets/pokeball-loading.json';

function PokemonLoading({message='Cargando...'}) {
  return (
    <div className="loading-container">
      <div>
        <Lottie
          animationData={pokeballAnimation} 
          loop={true}
          autoplay={true}
        />
      </div>
      <p>{message}</p>
    </div>
  );
}

export default PokemonLoading;