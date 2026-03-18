import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  const handleEnter = () => {
    // Simular que el ususario se autentificar aproipiadamenre
    navigate('/dashboard')
  }

  return (
    <div className="login-container">
      <h1>Beinvenido al HeatMap</h1>
      <p>Este es un entorno de desarrollo sin protección.</p>
      
      <button onClick={handleEnter} style={{ padding: '10px 20px', fontSize: '1rem', cursor: 'pointer' }}>
        Entrar al Dashboard
      </button>
      
      <div style={{ marginTop: '20px' }}>
        <Link to="/dashboard">O ir directamente al Dashboard</Link>
      </div>
    </div>
  )
}

export default Login