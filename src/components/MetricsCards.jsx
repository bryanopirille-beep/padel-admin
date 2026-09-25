import React from 'react';

export default function MetricsCards({ totalIncome = 0, activeCount = 0, pendingDebt = 0 }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
      <div className="padel-card">
        <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ingresos Totales (Gs.)</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)', margin: '0.5rem 0 0 0' }}>
          {totalIncome.toLocaleString()} Gs.
        </p>
      </div>
      
      <div className="padel-card">
        <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Reservas Activas</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)', margin: '0.5rem 0 0 0' }}>
          {activeCount}
        </p>
      </div>

      <div className="padel-card">
        <h4 style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Deudas Pendientes (Morosos)</h4>
        <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#f43f5e', margin: '0.5rem 0 0 0' }}>
          {pendingDebt.toLocaleString()} Gs.
        </p>
      </div>
    </div>
  );
}