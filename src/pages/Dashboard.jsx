import Filtros from '../components/Filtros'
import NuevoReporte from '../components/NuevoReporte'
import Perfil from '../components/Perfil'
import Estadisticas from '../components/Estadisticas'

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <header>
        <h1>Dashboard de Heatmap</h1>
        <Perfil/>
      </header>
      
      <section className="controls">
        <Filtros />
        <NuevoReporte />
      </section>

      <main className="content">
        <Estadisticas />
        {/* aquí ir a lo de el mapa y los heat layers y eso*/}
        <div className="card">
          <h2>Mapa</h2>
          <p>El mapa de calor se renderizara aquí.</p>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
