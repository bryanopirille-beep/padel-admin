import React, { useState } from 'react';

export default function BookingForm({ onAddBooking }) {
  const [court, setCourt] = useState('Cancha 1');
  const [responsible, setResponsible] = useState('');
  const [hours, setHours] = useState(1);
  const [players, setPlayers] = useState([
    { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
    { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
    { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
    { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' }
  ]);

  const PRICE_PER_HOUR = 80000;
  const DRINK_PRICES = {
    agua: 8000,
    gaseosa: 12000,
    energizante: 18000,
    cerveza: 20000
  };

  const handlePlayerNameChange = (index, value) => {
    const updated = [...players];
    updated[index].name = value;
    setPlayers(updated);
  };

  const handlePlayerDrinkChange = (index, drink, value) => {
    const updated = [...players];
    updated[index][drink] = value === '' ? '' : Math.max(0, parseInt(value) || 0);
    setPlayers(updated);
  };

  const hoursVal = parseInt(hours) || 0;
  const totalCourt = hoursVal * PRICE_PER_HOUR;
  const courtPerPlayer = totalCourt / 4;

  const playerBreakdown = players.map(p => {
    const aguaVal = parseInt(p.agua) || 0;
    const gaseosaVal = parseInt(p.gaseosa) || 0;
    const energizanteVal = parseInt(p.energizante) || 0;
    const cervezaVal = parseInt(p.cerveza) || 0;

    const drinksTotal = (aguaVal * DRINK_PRICES.agua) +
                        (gaseosaVal * DRINK_PRICES.gaseosa) +
                        (energizanteVal * DRINK_PRICES.energizante) +
                        (cervezaVal * DRINK_PRICES.cerveza);
    return {
      ...p,
      agua: aguaVal,
      gaseosa: gaseosaVal,
      energizante: energizanteVal,
      cerveza: cervezaVal,
      drinksTotal,
      total: courtPerPlayer + drinksTotal
    };
  });

  const totalDrinks = playerBreakdown.reduce((acc, p) => acc + p.drinksTotal, 0);
  const grandTotal = totalCourt + totalDrinks;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!responsible.trim()) return alert('Por favor ingresa el nombre del responsable.');

    const newBooking = {
      id: Date.now(),
      court,
      responsible,
      hours: hoursVal || 1,
      totalCourt,
      totalDrinks,
      grandTotal,
      playerBreakdown,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    onAddBooking(newBooking);
    
    setResponsible('');
    setHours(1);
    setPlayers([
      { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
      { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
      { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' },
      { name: '', agua: '', gaseosa: '', energizante: '', cerveza: '' }
    ]);
  };

  return (
    <div className="padel-card" style={{ marginBottom: '2rem' }}>
      <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Registrar Nueva Reserva</h3>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Cancha</label>
            <select 
              value={court} 
              onChange={(e) => setCourt(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0c100e', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
            >
              <option value="Cancha 1">Cancha 1</option>
              <option value="Cancha 2">Cancha 2</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Responsable de la Reserva</label>
            <input 
              type="text" 
              value={responsible} 
              onChange={(e) => setResponsible(e.target.value)}
              placeholder="Nombre y Apellido"
              required
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0c100e', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Horas (80mil/h)</label>
            <input 
              type="text" 
              inputMode="numeric"
              value={hours} 
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setHours(val === '' ? '' : Math.max(1, parseInt(val)));
              }}
              placeholder="1"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0c100e', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box', textAlign: 'center' }} 
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            Jugadores y Consumo Individual (Cancha: {courtPerPlayer.toLocaleString()} Gs. c/u)
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {players.map((p, index) => (
              <div key={index} className="responsive-player-row">
                <input 
                  type="text"
                  value={p.name}
                  onChange={(e) => handlePlayerNameChange(index, e.target.value)}
                  placeholder={`Jugador ${index + 1}`}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
                />
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Agua (8k)</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={p.agua} 
                    onChange={(e) => handlePlayerDrinkChange(index, 'agua', e.target.value.replace(/\D/g, ''))} 
                    placeholder="0"
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center' }} 
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Gaseosa (12k)</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={p.gaseosa} 
                    onChange={(e) => handlePlayerDrinkChange(index, 'gaseosa', e.target.value.replace(/\D/g, ''))} 
                    placeholder="0"
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center' }} 
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Energ. (18k)</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={p.energizante} 
                    onChange={(e) => handlePlayerDrinkChange(index, 'energizante', e.target.value.replace(/\D/g, ''))} 
                    placeholder="0"
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center' }} 
                  />
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Cerveza (20k)</span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={p.cerveza} 
                    onChange={(e) => handlePlayerDrinkChange(index, 'cerveza', e.target.value.replace(/\D/g, ''))} 
                    placeholder="0"
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)', textAlign: 'center' }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ backgroundColor: '#0c100e', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)' }}>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Cancha Total: {totalCourt.toLocaleString()} Gs. | Cantina Total: {totalDrinks.toLocaleString()} Gs.</span>
          <span style={{ color: 'var(--accent)', fontSize: '1.2rem', fontWeight: 'bold' }}>Total General: {grandTotal.toLocaleString()} Gs.</span>
        </div>

        <button 
          type="submit"
          style={{ padding: '0.75rem', backgroundColor: 'var(--accent)', color: '#0c100e', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
        >
          Guardar Reserva con Desglose
        </button>
      </form>
    </div>
  );
}