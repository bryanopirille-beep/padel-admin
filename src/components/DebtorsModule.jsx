import React, { useState } from 'react';

export default function DebtorsModule({ debtors = [], onAddDebtor }) {
  const [name, setName] = useState('');
  const [concept, setConcept] = useState('Alquiler de Cancha / Mensualidad');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('Septiembre');
  const [year, setYear] = useState('2026');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !amount) return alert('Por favor completa los campos obligatorios.');

    const newDebtor = {
      id: Date.now(),
      name,
      concept,
      amount: parseFloat(amount),
      month,
      year,
      dateAdded: new Date().toLocaleDateString()
    };

    onAddDebtor(newDebtor);
    setName('');
    setAmount('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Formulario para registrar nuevo moroso */}
      <div className="padel-card">
        <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Registrar Nuevo Pago Pendiente (Moroso)</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Nombre del Cliente / Deudor</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Monto a Pagar (Gs.)</label>
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Ej. 150000"
                required
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#0f172a', border: '1px solid var(--border-color)', color: 'var(--text-main)', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Concepto</label>
              <input 
                type="text" 
                value={concept} 
                onChange={(e) => setConcept(e.target.value)}
                placeholder="Ej. Torneo / Mensualidad / Cancha Fiada"
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

          <button 
            type="submit"
            style={{ padding: '0.75rem', backgroundColor: 'var(--accent)', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem', marginTop: '0.5rem' }}
          >
            Registrar Deuda Pendiente
          </button>
        </form>
      </div>

      {/* Lista de Morosos */}
      <div className="padel-card">
        <h3 style={{ marginTop: 0, color: 'var(--text-main)' }}>Listado de Morosos y Pagos Pendientes</h3>
        
        {debtors.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>No hay deudas pendientes registradas.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {debtors.map((d) => (
              <div key={d.id} style={{ backgroundColor: '#0f172a', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.3rem' }}>
                    <strong style={{ color: 'var(--text-main)', fontSize: '1.1rem' }}>{d.name}</strong>
                    <span style={{ backgroundColor: 'rgba(244, 63, 94, 0.2)', color: '#f43f5e', padding: '0.15rem 0.5rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                      {d.month} {d.year}
                    </span>
                  </div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Concepto: {d.concept}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#f43f5e', fontSize: '1.2rem', fontWeight: 'bold', display: 'block' }}>
                    {d.amount.toLocaleString()} Gs.
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Registrado el {d.dateAdded}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}