function LoadingState({ loading, error, total }) {
  if (loading) {
    return <p className="status loading">Cargando datos desde la API...</p>
  }

  if (error) {
    return <p className="status error">{error}</p>
  }

  return <p className="status success">Resultados: {total}</p>
}

export default LoadingState
