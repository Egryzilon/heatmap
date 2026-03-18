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

const weekData = [
  { dia: "Lun", valor: 18 },
  { dia: "Mar", valor: 42 },
  { dia: "Mié", valor: 22 },
  { dia: "Jue", valor: 28 },
  { dia: "Vie", valor: 45 },
  { dia: "Sáb", valor: 38 },
  { dia: "Dom", valor: 20 },
];

const pieData = [
  { name: "SMZ 251", value: 58, fill: "#3B82F6" },
  { name: "SMZ 64",  value: 42, fill: "#60A5FA" },
  { name: "SMZ 103", value: 31, fill: "#93C5FD" },
  { name: "Otros",   value: 12, fill: "#E5E7EB" },
];

const topZonas = [
  { rank: 1, name: "SMZ 251", sub: "Región 241",       count: 58, color: "#3B82F6" },
  { rank: 2, name: "SMZ 64",  sub: "Col. Universidad", count: 42, color: "#60A5FA" },
  { rank: 3, name: "SMZ 103", sub: "Cielo Nuevo",      count: 31, color: "#93C5FD" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "white",
      border: "1px solid #EFF6FF",
      borderRadius: "8px",
      padding: "8px 14px",
      boxShadow: "0 4px 12px rgba(59,130,246,0.1)",
      fontSize: "13px",
      color: "#374151",
    }}>
      <div style={{ fontWeight: 700 }}>{label}</div>
      <div style={{ color: "#3B82F6" }}>{payload[0].value} incidentes</div>
    </div>
  );
};

function Estadisticas() {
  const total = weekData.reduce((acc, d) => acc + d.valor, 0);

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .stats-wrapper {
          min-height: 100vh;
          background: #F8FAFF;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
          padding: clamp(16px, 4vw, 40px) clamp(16px, 5vw, 48px);
        }

        .stats-header {
          margin-bottom: 28px;
          border-bottom: 2px solid #3B82F6;
          padding-bottom: 18px;
        }

        .stats-badge-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }

        .stats-badge {
          background: #3B82F6;
          color: white;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          padding: 3px 10px;
          border-radius: 4px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .stats-title {
          font-size: clamp(18px, 3.5vw, 28px);
          font-weight: 800;
          color: #111;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .card {
          background: white;
          border-radius: 16px;
          padding: clamp(16px, 3vw, 28px) clamp(16px, 3vw, 32px);
          border: 1px solid #DBEAFE;
          box-shadow: 0 1px 4px rgba(59,130,246,0.07);
        }

        .card-label {
          font-size: 13px;
          color: #6B7280;
          font-weight: 500;
          margin: 0 0 12px;
        }

        .grid-top {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .grid-charts {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .kpi-number {
          font-size: clamp(36px, 7vw, 64px);
          font-weight: 900;
          color: #111;
          line-height: 1;
        }

        .kpi-badge {
          background: #EFF6FF;
          color: #2563EB;
          border-radius: 6px;
          padding: 3px 9px;
          font-size: 12px;
          font-weight: 700;
        }

        .zona-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .zona-rank {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          color: white;
          font-size: 12px;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .btn-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-back {
          padding: 10px 24px;
          background: white;
          color: #374151;
          border: 1.5px solid #BFDBFE;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
          flex: 1;
          min-width: 120px;
        }
        .btn-back:hover {
          border-color: #3B82F6;
          color: #3B82F6;
        }

        .btn-map {
          padding: 10px 24px;
          background: #3B82F6;
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          cursor: pointer;
          transition: background 0.15s;
          flex: 1;
          min-width: 120px;
        }
        .btn-map:hover {
          background: #2563EB;
        }

        @media (max-width: 768px) {
          .grid-top, .grid-charts {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 480px) {
          .stats-wrapper { padding: 16px; }
          .btn-row { flex-direction: column; }
          .btn-back, .btn-map { width: 100%; text-align: center; }
        }
      `}</style>

      <div className="stats-wrapper">

        {/* header */}
        <div className="stats-header">
          <div className="stats-badge-row">
            <span className="stats-badge">Vista 3 / 3</span>
            <span style={{ color: "#9CA3AF", fontSize: "13px" }}>Análisis de Datos</span>
          </div>
          <h1 className="stats-title">Estadísticas de la Ciudad</h1>
        </div>

        {/* kpi + ranking */}
        <div className="grid-top">

          <div className="card">
            <p className="card-label">Total — Últimos 7 días</p>
            <div className="kpi-number">{total}</div>
            <div style={{ marginTop: "14px", display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              <span className="kpi-badge">▲ 12%</span>
              <span style={{ fontSize: "12px", color: "#9CA3AF" }}>vs semana anterior</span>
            </div>
          </div>

          <div className="card">
            <p className="card-label">Zonas de Alta Incidencia — Top 3</p>
            {topZonas.map(z => (
              <div key={z.rank} className="zona-row">
                <span className="zona-rank" style={{ background: z.color }}>{z.rank}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: "14px", color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{z.name}</div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{z.sub}</div>
                </div>
                <span style={{ fontWeight: 800, fontSize: "16px", color: z.color, flexShrink: 0 }}>{z.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* gráficas */}
        <div className="grid-charts">

          <div className="card">
            <p className="card-label">Tendencia por Día de la Semana</p>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={weekData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3B82F6" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}   />
                  </linearGradient>
                </defs>
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
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  fill="url(#colorValor)"
                  dot={{ r: 4, fill: "white", stroke: "#3B82F6", strokeWidth: 2.5 }}
                  activeDot={{ r: 6, fill: "#3B82F6", stroke: "white", strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="card" style={{ display: "flex", flexDirection: "column" }}>
            <p className="card-label">Distribución por Zona</p>
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
                      border: "1px solid #EFF6FF",
                      fontSize: "12px",
                      boxShadow: "0 4px 12px rgba(59,130,246,0.1)",
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
        <div className="btn-row">
          <button className="btn-back">← Atrás</button>
          <button className="btn-map">Volver al Mapa</button>
        </div>

      </div>
    </>
  );
}

export default Estadisticas;