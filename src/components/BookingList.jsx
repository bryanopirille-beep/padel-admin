import React from 'react';

export default function BookingList({ bookings = [] }) {
  return (
    <div className="padel-card">
      <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Historial de Reservas del Día</h3>
      
      {bookings.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>No hay reservas registradas todavía.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {bookings.map((b) => (
            <div key={b.id} style={{ backgroundColor: '#0c100e', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div>
                  <span style={{ backgroundColor: 'var(--accent)', color: '#0c100e', padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 'bold', marginRight: '0.75rem' }}>
                    {b.court}
                  </span>
                  <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>Responsable: {b.responsible}</strong>
                </div>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{b.time} hs</span>
              </div>

              {/* Desglose por persona */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Desglose por jugador ({b.hours} hora(s) de cancha):</span>
                {b.playerBreakdown.map((p, idx) => (
                  <div key={idx} style={{ backgroundColor: '#141c18', padding: '0.5rem 0.75rem', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--text-main)', fontWeight: '500' }}>
                      {p.name || `Jugador ${idx + 1}`} 
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
                        (Cancha: {(b.totalCourt / 4).toLocaleString()} Gs. 
                        {p.drinksTotal > 0 ? ` + Cantina: ${Object.entries({agua: p.agua, gaseosa: p.gaseosa, energizante: p.energizante, cerveza: p.cerveza}).filter(([_, q]) => q > 0).map(([k, q]) => `${q}${k}`).join(', ')}` : ''})
                      </span>
                    </span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{p.total.toLocaleString()} Gs.</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  Total Cobrado de la Cancha: {b.grandTotal.toLocaleString()} Gs.
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}