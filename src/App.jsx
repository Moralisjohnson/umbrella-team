import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import DetalhesAgendamento from './pages/DetalhesAgendamento'
import Login from './pages/Login'
import Cadastro from './pages/Cadastro'
import EsqueciSenha from './pages/EsqueciSenha'
import Busca from './pages/Busca'
import Anunciar from './pages/Anunciar'
import Reserva from './pages/Reserva'
import Chat from './pages/Chat'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/detalhes/:id" element={<DetalhesAgendamento />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/esqueci-senha" element={<EsqueciSenha />} />
      <Route path="/busca" element={<Busca />} />
      <Route path="/anunciar" element={<Anunciar />} />
      <Route path="/reserva/:id" element={<Reserva />} />
      <Route path="/chat/:id" element={<Chat />} />
    </Routes>
  )
}

export default App
