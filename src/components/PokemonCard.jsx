function PokemonCard({ pokemon }) {
  return (
    <article className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      <h3>{pokemon.name}</h3>
      <p>#{String(pokemon.id).padStart(3, '0')}</p>
      <p className="pokemon-types">{pokemon.types.join(' / ')}</p>
    </article>
  )
}

export default PokemonCard
