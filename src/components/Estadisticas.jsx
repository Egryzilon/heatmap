function Estadisticas() {
  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estadísticas de la Ciudad</h1>
        <div className="flex gap-2 mb-4">
          <div className="w-16 h-1 bg-blue-500"></div>
          <div className="w-16 h-1 bg-blue-500"></div>
          <div className="w-16 h-1 bg-blue-500"></div>
        </div>
        <p className="text-gray-600">Vista 3 de 3: Análisis de Datos</p>
      </div>

      {/* Grid 2 columnas */}
      <div className="grid grid-cols-2 gap-12 mb-8">
        {/* Resumen */}
        <div>
          <h2 className="text-xl font-bold mb-4">Resumen Semanal</h2>
          <div className="text-5xl font-bold mb-2">143</div>
          <p className="text-gray-600 text-sm">Incidentes en los últimos 7 días</p>
        </div>

        {/* Top Zonas */}
        <div>
          <h2 className="text-xl font-bold mb-4">Zona de Alta Incidencia (Top 3)</h2>
          <ul className="space-y-2 text-gray-700">
            <li>1. SMZ 251 (Región 251)</li>
            <li>2. SMZ 64 (Colonia Donceles)</li>
            <li>3. SMZ 103 (Colonia Cuna Maya)</li>
          </ul>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
          Atrás
        </button>
        <button className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Volver al Mapa
        </button>
      </div>
    </div>
  )
}

export default Estadisticas
