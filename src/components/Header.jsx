import React from 'react';

export default function Header() {
  return (
    <header style={{ 
      padding: '1.5rem 2rem', 
      textAlign: 'center', 
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      backdropFilter: 'blur(8px)',
      marginBottom: '2rem'
    }}>
      <h1 style={{ 
        margin: 0, 
        fontSize: '2rem', 
        fontWeight: '700', 
        letterSpacing: '-0.5px',
        color: '#ffffff',
        textShadow: '0 2px 10px rgba(0,0,0,0.5)'
      }}>
        Padel Club <span style={{ color: 'var(--accent)' }}>Admin</span>
      </h1>
      <p style={{ margin: '0.4rem 0 0 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
        Sistema de gestión de canchas, cantina y morosos
      </p>
    </header>
  );
}