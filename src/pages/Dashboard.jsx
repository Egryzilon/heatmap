import CustomMap from '../components/CustomMap'
function Dashboard() {
  return (
    <div className="w-screen h-screen absolute top-0 left-0">
      <header className='bg-[#141956]'>
        <div className='flex border-5 relative'>
          <h1 className="text-left text-white text-3xl p-5 font-bold">SRC</h1>
          <img src="src/assets/bell-notification-svgrepo-com.svg" alt="notifications" width={50} className='absolute right-15 top-1/5' />
          <img src="src/assets/user-circle-svgrepo-com.svg" alt="user" width={50} className='absolute right-0 top-1/5' />
        </div>
        <div className="bg-[#0B0F3B] relative flex p-1">
          <img src="https://www.svgrepo.com/show/521826/search.svg" alt="Lupa" width={30} className='absolute left-2 top-1/2 -translate-y-1/2 opacity-50' />
          <input className="bg-white rounded-sm w-1/3 pl-10 py-1 border"
            type="text" placeholder="Buscar direccion, colonia, o tipo de delito... " />
        </div>
      </header>
      <main className="h-9/10">
        {/* aquí ir a lo de el mapa y los heat layers y eso*/}
        <div className='border w-screen h-1/1'>
          <CustomMap />
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
