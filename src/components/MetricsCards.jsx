export default function MetricsCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h4 style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Ingresos Totales (Gs.)</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38bdf8', margin: '0.5rem 0 0 0' }}>0 Gs.</p>
      </div>
      <div style={{ backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '12px', border: '1px solid #334155' }}>
        <h4 style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Reservas Activas</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#38bdf8', margin: '0.5rem 0 0 0' }}>0</p>
      </div>
    </div>
  );
}