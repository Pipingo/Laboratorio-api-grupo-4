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
  }
}

function App() {
  const [search, setSearch] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function loadPokemons() {
      setLoading(true)
      setError('')

      try {
        if (search.trim() === '') {
          const listResponse = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12', {
            signal: controller.signal,
          })

          if (!listResponse.ok) {
            throw new Error('No fue posible cargar la lista inicial.')
          }

          const listData = await listResponse.json()
          const detailResponses = await Promise.all(
            listData.results.map((entry) => fetch(entry.url, { signal: controller.signal })),
          )

          const hasErrors = detailResponses.some((response) => !response.ok)
          if (hasErrors) {
            throw new Error('Fallo al cargar algunos Pokemon.')
          }

          const detailData = await Promise.all(detailResponses.map((response) => response.json()))
          setPokemons(detailData.map(mapPokemonData))
        } else {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`, {
            signal: controller.signal,
          })

          if (!response.ok) {
            throw new Error('Pokemon no encontrado. Prueba otro nombre.')
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
  }, [search])

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="kicker">Laboratorio React</p>
        <h1>Buscador de Pokemon con API publica</h1>
        <p className="subtitle">
          Esta app usa <code>useState</code>, <code>useEffect</code>, componentes con props y manejo de
          estado de carga.
        </p>
      </header>

      <SearchBar value={search} onChange={setSearch} />
      <LoadingState loading={loading} error={error} total={pokemons.length} />
      {!loading && <PokemonList pokemons={pokemons} />}
    </main>
  )
}

export default App
