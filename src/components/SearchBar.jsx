function SearchBar({ value, onChange }) {

  function clearSearch() {
    onChange('')
  }

  function handleChange(event) {
    onChange(event.target.value.trimStart())
  }

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      clearSearch()
    }
  }

  return (
    <section className="search-panel">

      <label htmlFor="pokemon-search" className="search-label">
        Buscar Pokémon
      </label>

      <input
        id="pokemon-search"
        className="search-input"
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder="Ejemplo: pikachu"
        autoComplete="off"
      />

      {value && (
        <button
          type="button"
          className="search-clear-btn"
          onClick={clearSearch}
        >
          Limpiar
        </button>
      )}

    </section>
  )
}

export default SearchBar