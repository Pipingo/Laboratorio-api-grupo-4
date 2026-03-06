const typeColors = {
  fire: "#ff6b6b",
  water: "#4dabf7",
  grass: "#51cf66",
  electric: "#ffd43b",
  psychic: "#cc5de8",
  ice: "#74c0fc",
  dragon: "#845ef7",
  dark: "#495057",
  fairy: "#faa2c1",
  normal: "#adb5bd",
}

function PokemonCard({ pokemon }) {
  return (
    <article
      className="pokemon-card"
      style={{ background: typeColors[pokemon.types[0]] || "#fff" }}
    >
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="pokemon-image"
      />

      <h3>{pokemon.name}</h3>

      <p>#{String(pokemon.id).padStart(3, '0')}</p>

      <p className="pokemon-types">
        {pokemon.types.join(' / ')}
      </p>

      <p>Altura: {pokemon.height}</p>

      <p>Peso: {pokemon.weight}</p>
    </article>
  )
}

export default PokemonCard