import PokemonCard from './PokemonCard'

function PokemonList({ pokemons }) {
  if (pokemons.length === 0) {
    return <p className="empty-state">No hay resultados para esa busqueda.</p>
  }

  return (
    <section className="pokemon-grid">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </section>
  )
}

export default PokemonList
