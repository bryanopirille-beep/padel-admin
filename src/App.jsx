import React, { useState } from 'react';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import DebtorsManager from './components/DebtorsManager';

export default function App() {
  const [activeTab, setActiveTab] = useState('bookings');

  return (
    <div style={{ minHeight: '100vh', padding: '2rem' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <Header />
        
        {/* Pestañas de navegación */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('bookings')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === 'bookings' ? '#38bdf8' : '#1e293b',
              color: activeTab === 'bookings' ? '#0f172a' : '#f8fafc',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Gestión de Reservas & Cantina
          </button>
          <button 
            onClick={() => setActiveTab('debtors')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: activeTab === 'debtors' ? '#38bdf8' : '#1e293b',
              color: activeTab === 'debtors' ? '#0f172a' : '#f8fafc',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Control de Morosos Mensuales
          </button>
        </div>

        <MetricsCards />

        {activeTab === 'bookings' ? (
          <div>
            <BookingForm />
            <BookingList />
          </div>
        ) : (
          <DebtorsManager />
        )}
      </div>
    </div>
  );
}