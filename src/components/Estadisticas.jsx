import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";

function Estadisticas() {
  const data = [
    { dia: "Lun", valor: 18 },
    { dia: "Mar", valor: 1000 },
    { dia: "Mié", valor: 22 },
    { dia: "Jue", valor: 28 },
    { dia: "Vie", valor: 45 },
    { dia: "Sáb", valor: 38 },
    { dia: "Dom", valor: 20 },
  ];

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Estadísticas de la Ciudad</h1>
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
            <li>1. SMZ 251 (Región 241)</li>
            <li>2. SMZ 64 (colocio ut xd)</li>
            <li>3. SMZ 103 (cielo nuevo xddddddddddddddd)</li>
          </ul>
        </div>
      </div>

      {/* Gráfico de Tendencia */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Tendencia por Día de la Semana</h2>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="dia" tick={{ fontSize: 11, fill: "#9CA3AF" }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="#EF4444"
              strokeWidth={2.5}
              fill="url(#colorValor)"
              dot={{ r: 4, fill: "white", stroke: "#EF4444", strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Botones */}
      <div className="flex gap-4">
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
          Atrás
        </button>
        <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105">
          Volver al Mapa
        </button>
      </div>
    </div>
  )
}

export default Estadisticas
