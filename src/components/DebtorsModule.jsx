import React, { useState } from 'react';

export default function DebtorsModule({ debtors = [], onAddDebtor, onDeleteDebtor }) {
  const [name, setName] = useState('');
  const [hours, setHours] = useState(1);
  const [drinks, setDrinks] = useState({
    agua: '',
    gaseosa: '',
    energizante: '',
    cerveza: ''
  });
  const [month, setMonth] = useState('Septiembre');
  const [year, setYear] = useState('2026');

  const PRICE_PER_HOUR = 80000;
  const DRINK_PRICES = {
    agua: 8000,
    gaseosa: 12000,
    energizante: 18000,
    cerveza: 20000
  };

  const handleDrinkChange = (drink, value) => {
    const cleanVal = value === '' ? '' : Math.max(0, parseInt(value) || 0);
    setDrinks({ ...drinks, [drink]: cleanVal });
  };

  // Cálculos automáticos de la deuda (manejando valores vacíos como 0)
  const hoursVal = parseInt(hours) || 0;
  const totalCourt = hoursVal * PRICE_PER_HOUR;
  
  const totalDrinks = Object.keys(drinks).reduce((acc, key) => {
    const drinkQty = parseInt(drinks[key]) || 0;
    return acc + (drinkQty * DRINK_PRICES[key]);
  }, 0);

  const totalDebt = totalCourt + totalDrinks;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return alert('Por favor ingresa el nombre del cliente.');
    if (totalDebt <= 0) return alert('La deuda debe ser mayor a 0.');

    // Convertir los valores vacíos de bebidas a 0 para el objeto guardado
    const formattedDrinks = {
      agua: parseInt(drinks.agua) || 0,
      gaseosa: parseInt(drinks.gaseosa) || 0,
      energizante: parseInt(drinks.energizante) || 0,
      cerveza: parseInt(drinks.cerveza) || 0
    };

    const newDebtor = {
      id: Date.now(),
      name,
      hours: hoursVal,
      drinks: formattedDrinks,
      totalCourt,
      totalDrinks,
      amount: totalDebt,
      month,
      year,
      dateAdded: new Date().toLocaleDateString()
    };

    onAddDebtor(newDebtor);
    
    // Limpiar formulario
    setName('');
    setHours(1);
    setDrinks({ agua: '', gaseosa: '', energizante: '', cerveza: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Formulario para registrar nuevo moroso con desglose */}
      <div className="padel-card">
        <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Registrar Pago Pendiente / Moroso</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="responsive-grid-3">
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre del Cliente</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Mía Pirille"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Mes</label>
              <select 
                value={month} 
                onChange={(e) => setMonth(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
              >
                {['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Año</label>
              <select 
                value={year} 
                onChange={(e) => setYear(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
              >
                <option value="2026">2026</option>
                <option value="2027">2027</option>
              </select>
            </div>
          </div>

          {/* Horas de Cancha pendientes */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Horas de Cancha Pendientes (80.000 Gs./h)
            </label>
            <input 
              type="text" 
              inputMode="numeric"
              value={hours} 
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setHours(val === '' ? '' : parseInt(val));
              }}
              placeholder="1"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
            />
          </div>

          {/* Consumo de Cantina pendiente */}
          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Consumo de Cantina Pendiente</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
              {Object.keys(drinks).map((drink) => (
                <div key={drink} style={{ backgroundColor: '#0f172a', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <span style={{ display: 'block', textTransform: 'capitalize', color: 'var(--text-main)', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                    {drink} ({DRINK_PRICES[drink].toLocaleString()} Gs.)
                  </span>
                  <input 
                    type="text" 
                    inputMode="numeric"
                    value={drinks[drink]}
                    onChange={(e) => handleDrinkChange(drink, e.target.value.replace(/\D/g, ''))}
                    placeholder="0"
                    style={{ width: '100%', padding: '0.4rem', borderRadius: '6px', backgroundColor: '#1e293b', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box', textAlign: 'center' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Resumen calculado automáticamente */}
          <div style={{ backgroundColor: '#0f172a', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Cancha: {totalCourt.toLocaleString()} Gs. | Cantina: {totalDrinks.toLocaleString()} Gs.
            </span>
            <span style={{ color: '#f43f5e', fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total Deuda: {totalDebt.toLocaleString()} Gs.
            </span>
          </div>

          <button 
            type="submit"
            style={{ padding: '0.75rem', backgroundColor: '#f43f5e', color: '#f8fafc', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}
          >
            Registrar Deuda Pendiente
          </button>
        </form>
      </div>

      {/* Lista de Morosos detallada con botón de Pagado */}
      <div className="padel-card">
        <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Listado de Morosos y Pagos Pendientes</h3>
        
        {debtors.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>No hay deudas pendientes registradas.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {debtors.map((d) => (
              <div key={d.id} style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.3)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{d.name}</strong>
                    <span style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', padding: '0.15rem 0.6rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {d.month} {d.year}
                    </span>
                  </div>
                  <span style={{ color: '#f43f5e', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    {d.amount.toLocaleString()} Gs.
                  </span>
                </div>

                {/* Desglose de consumo en la deuda */}
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <strong>Detalle:</strong> {d.hours} hora(s) de cancha ({d.totalCourt.toLocaleString()} Gs.)
                  {d.totalDrinks > 0 && (
                    <span> | Cantina: {Object.entries(d.drinks).filter(([_, q]) => q > 0).map(([k, q]) => `${q} ${k}`).join(', ')} ({d.totalDrinks.toLocaleString()} Gs.)</span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.75rem' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Registrado el {d.dateAdded}</span>
                  <button 
                    onClick={() => onDeleteDebtor(d.id)}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    ✓ Marcar como Pagado / Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}