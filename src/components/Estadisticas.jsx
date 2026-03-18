import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// incidentes por día, hardcoded por ahora hasta conectar el backend
const weekData = [
  { dia: "Lun", valor: 18 },
  { dia: "Mar", valor: 42 },
  { dia: "Mié", valor: 22 },
  { dia: "Jue", valor: 28 },
  { dia: "Vie", valor: 45 },
  { dia: "Sáb", valor: 38 },
  { dia: "Dom", valor: 20 },
];

// mismo orden que topZonas, los colores tienen que coincidir
const pieData = [
  { name: "SMZ 251", value: 58, fill: "#EF4444" },
  { name: "SMZ 64",  value: 42, fill: "#F97316" },
  { name: "SMZ 103", value: 31, fill: "#FBBF24" },
  { name: "Otros",   value: 12, fill: "#E5E7EB" },
];

// top 3 separado de pieData para poder actualizar uno sin romper el otro
const topZonas = [
  { rank: 1, name: "SMZ 251", sub: "Región 241",       count: 58, color: "#EF4444" },
  { rank: 2, name: "SMZ 64",  sub: "Col. Universidad", count: 42, color: "#F97316" },
  { rank: 3, name: "SMZ 103", sub: "Cielo Nuevo",      count: 31, color: "#FBBF24" },
];

// recharts inyecta active, payload y label automáticamente
// si no hay punto activo no renderizamos nada
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div style={{
      background: "white",
      border: "1px solid #F3F4F6",
      borderRadius: "8px",
      padding: "8px 14px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      fontSize: "13px",
      color: "#374151",
    }}>
      <div style={{ fontWeight: 700 }}>{label}</div>
      <div style={{ color: "#EF4444" }}>{payload[0].value} incidentes</div>
    </div>
  );
};

function Estadisticas() {
  // total calculado desde weekData, no hardcoded
  const total = weekData.reduce((acc, d) => acc + d.valor, 0);

  return (
    <>
      <style>{`
        .stats-wrapper {
          min-height: 100vh;
          background: #FAFAFA;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          padding: clamp(20px, 4vw, 40px) clamp(16px, 5vw, 48px);
          box-sizing: border-box;
        }

        /* dos columnas en desktop */
        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        /* el area chart necesita más espacio que el donut */
        .grid-charts {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
          margin-bottom: 24px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: clamp(18px, 3vw, 28px) clamp(18px, 3vw, 32px);
          border: 1px solid #E5E7EB;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
        }

        .btn-back {
          padding: 10px 28px;
          background: white;
          color: #374151;
          border: 1.5px solid #D1D5DB;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .btn-back:hover {
          border-color: #111;
          color: #111;
        }

        .btn-map {
          padding: 10px 28px;
          background: #111;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
        }
        .btn-map:hover {
          background: #374151;
        }

        /* móvil: todo apilado en una columna */
        @media (max-width: 768px) {
          .grid-2,
          .grid-charts {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="stats-wrapper">

        {/* header */}
        <div style={{ marginBottom: "32px", borderBottom: "2px solid #111", paddingBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <span style={{
              background: "#EF4444",
              color: "white",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              padding: "3px 10px",
              borderRadius: "4px",
              textTransform: "uppercase",
            }}>
              Vista 3 / 3
            </span>
            <span style={{ color: "#9CA3AF", fontSize: "13px" }}>Análisis de Datos</span>
          </div>
          <h1 style={{
            fontSize: "clamp(20px, 3vw, 28px)",
            fontWeight: 800,
            color: "#111",
            margin: 0,
            letterSpacing: "-0.5px",
          }}>
            Estadísticas de la Ciudad
          </h1>
        </div>

        {/* kpi + ranking */}
        <div className="grid-2">

          {/* total semanal */}
          <div className="card">
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, margin: "0 0 10px" }}>
              Total — Últimos 7 días
            </p>
            <div style={{ fontSize: "clamp(42px, 6vw, 64px)", fontWeight: 900, color: "#111", lineHeight: 1 }}>
              {total}
            </div>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{
                background: "#FEE2E2",
                color: "#DC2626",
                borderRadius: "6px",
                padding: "3px 9px",
                fontSize: "12px",
                fontWeight: 700,
              }}>
                ▲ 12%
              </span>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>vs semana anterior</span>
            </div>
          </div>

          {/* top 3 zonas */}
          <div className="card">
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, margin: "0 0 16px" }}>
              Zonas de Alta Incidencia — Top 3
            </p>
            {topZonas.map(z => (
              <div key={z.rank} style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
                <span style={{
                  width: "26px", height: "26px",
                  background: z.color,
                  borderRadius: "50%",
                  color: "white",
                  fontSize: "12px",
                  fontWeight: 800,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  {z.rank}
                </span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#111" }}>{z.name}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF" }}>{z.sub}</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: "16px", color: z.color }}>{z.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* gráficas */}
        <div className="grid-charts">

          {/* tendencia diaria — height fijo para que no se deforme en pantallas chicas */}
          <div className="card">
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, margin: "0 0 20px" }}>
              Tendencia por Día de la Semana
            </p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={weekData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                {/* degradado para el relleno bajo la línea */}
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                {/* sin axisLine ni tickLine para un look más limpio */}
                <XAxis
                  dataKey="dia"
                  tick={{ fontSize: 11, fill: "#9CA3AF", fontWeight: 500 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="valor"
                  stroke="#EF4444"
                  strokeWidth={2.5}
                  fill="url(#colorValor)"
                  dot={{ r: 4, fill: "white", stroke: "#EF4444", strokeWidth: 2.5 }}
                  activeDot={{ r: 6, fill: "#EF4444", stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* donut chart — innerRadius crea el hueco del centro */}
          <div className="card" style={{ display: "flex", flexDirection: "column" }}>
            <p style={{ fontSize: "13px", color: "#6B7280", fontWeight: 500, margin: "0 0 8px" }}>
              Distribución por Zona
            </p>
            <div style={{ flex: 1 }}>
              <ResponsiveContainer width="100%" height={130}>
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="80%"
                    innerRadius="55%"
                    strokeWidth={2}
                    stroke="white"
                    isAnimationActive
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} incidentes`, name]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "1px solid #F3F4F6",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* leyenda manual porque la de recharts no permite este nivel de control */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "8px" }}>
              {pieData.map((d) => (
                <div key={d.name} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "3px", background: d.fill, flexShrink: 0 }} />
                  <span style={{ fontSize: "12px", color: "#374151", flex: 1 }}>{d.name}</span>
                  <span style={{ fontSize: "12px", fontWeight: 700, color: "#111" }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* navegación */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <button className="btn-back">← Atrás</button>
          <button className="btn-map">Volver al Mapa</button>
        </div>

      </div>
    </>
  );
}

export default Estadisticas;