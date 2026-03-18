import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  /**
   * Todo: hace falta la logica del login?
   */
  const isAuthenticated = true

  return (
    <BrowserRouter>
      <Routes>
        {/* primero vamos a login */}
        <Route path="/login" element={<Login/>} />

        {/* algo de dasbhoard */}
        <Route path="/dashboard" element={<Dashboard/>} />

        {/* Todo redirect va a /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

    </BrowserRouter>
  )
}

export default App
