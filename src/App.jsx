import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetalhesAgendamento from './pages/DetalhesAgendamento'

function App() {
  return (
    <Routes>
      {/* Cada <Route> liga uma URL a uma tela.
          path="/"          -> http://localhost:5173/
          path="/detalhes"  -> http://localhost:5173/detalhes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/detalhes" element={<DetalhesAgendamento />} />
    </Routes>
  )
}

export default App
