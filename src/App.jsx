import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Routes>
      {/* Rota base de boas-vindas. As telas da aplicação são
          adicionadas em branches de feature. */}
      <Route
        path="/"
        element={
          <div className="container-fluid py-5 text-center">
            <h1 className="display-5 fw-bold">Project Umbrella</h1>
            <p className="lead text-secondary">
              Servidor React + Vite + Bootstrap configurado e pronto.
            </p>
          </div>
        }
      />
    </Routes>
  )
}

export default App
