import { useEffect, useState } from 'react'
import './App.css'
import LoadingState from './components/LoadingState'
import PokemonList from './components/PokemonList'
import SearchBar from './components/SearchBar'

function mapPokemonData(data) {
  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other['official-artwork'].front_default,
    types: data.types.map((typeEntry) => typeEntry.type.name),
    height: data.height,
    weight: data.weight
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemons() {
      setLoading(true)
      setError('')

      try {
        if (search.trim() === '') {

          const listResponse = await fetch(
            `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${page}`,
            { signal: controller.signal }
          )

          if (!listResponse.ok) {
            throw new Error('No fue posible cargar la lista.')
          }

          const listData = await listResponse.json()

          const detailResponses = await Promise.all(
            listData.results.map((entry) =>
              fetch(entry.url, { signal: controller.signal })
            )
          )

          const detailData = await Promise.all(
            detailResponses.map((response) => response.json())
          )

          setPokemons(detailData.map(mapPokemonData))

        } else {

          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`,
            { signal: controller.signal }
          )

          if (!response.ok) {
            throw new Error('Pokemon no encontrado.')
          }

          const data = await response.json()

          setPokemons([mapPokemonData(data)])
        }

      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setPokemons([])
          setError(requestError.message)
        }

      } finally {
        setLoading(false)
      }
    }

    loadPokemons()

    return () => {
      controller.abort()
    }

  }, [search, page])

  return (
    <main className="app-shell">

      <header className="hero">
        <p className="kicker">Laboratorio React</p>

        <h1>Buscador de Pokemon con API publica</h1>

        <p className="subtitle">
          Esta app usa <code>useState</code> y <code>useEffect</code>
        </p>
      </header>

      <SearchBar value={search} onChange={setSearch} />

      <LoadingState loading={loading} error={error} total={pokemons.length} />

      {!loading && <PokemonList pokemons={pokemons} />}

      {search === '' && (
        <div style={{ marginTop: "20px" }}>

          <button
            onClick={() => setPage(page - 12)}
            disabled={page === 0}
          >
            Anterior
          </button>

          <button
            onClick={() => setPage(page + 12)}
          >
            Siguiente
          </button>

        </div>
      )}

    </main>
  )
}

export default App