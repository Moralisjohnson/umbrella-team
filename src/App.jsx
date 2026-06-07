import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetalhesAgendamento from './pages/DetalhesAgendamento'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import Busca from './pages/Busca'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detalhes" element={<DetalhesAgendamento />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/busca" element={<Busca />} />
    </Routes>
  )
}

export default App
