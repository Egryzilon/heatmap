import Filtros from '../components/Filtros'
import NuevoReporte from '../components/NuevoReporte'
import Perfil from '../components/Perfil'
import Estadisticas from '../components/Estadisticas'
import CustomMap from '../components/CustomMap'
function Dashboard() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0">
      <header className='bg-[#141956]'>
        <h1 className="text-left text-white text-2xl font-bold">SRC</h1>
              <div className="bg-[#0B0F3B] relative border flex">
        placeholder
        <input className="bg-white rounded-sm absolute left-0 ml-5 pl-5 w-1/2 border"
          type="text" placeholder="Buscar dirección, colonia, o tipo de delito" />
      </div>
      </header>
      <main className="content">
        {/* aquí ir a lo de el mapa y los heat layers y eso*/}
      <div className='border w-screen h-[40vw]'>
        <CustomMap/>
      </div>
      </main>
      <footer className='bg-[#0B0F3B] grid grid-cols-3'>
        <p>Mapa</p>
        <p>Estadisticas</p>
        <p>Mi Perfil</p>
      </footer>
    </div>
  )
}

export default Dashboard
