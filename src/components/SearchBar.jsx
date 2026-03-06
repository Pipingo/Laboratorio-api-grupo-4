function SearchBar({ value, onChange }) {

  function clearSearch() {
    onChange('')
  }

  return (
    <section className="search-panel">

      <label htmlFor="pokemon-search" className="search-label">
        Buscar Pokemon
      </label>

      <input
        id="pokemon-search"
        className="search-input"
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Ejemplo: pikachu"
        autoComplete="off"
      />

      {value && (
        <button onClick={clearSearch}>
          Limpiar
        </button>
      )}

    </section>
  )
}

export default SearchBar