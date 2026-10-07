import React, { useState } from 'react';
import Header from './components/Header';
import MetricsCards from './components/MetricsCards';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import DebtorsModule from './components/DebtorsModule';

export default function App() {
  const [activeTab, setActiveTab] = useState('reservas');
  const [bookings, setBookings] = useState([]);
  const [debtors, setDebtors] = useState([]);

  const handleAddBooking = (newBooking) => {
    setBookings([newBooking, ...bookings]);
  };

  const handleAddDebtor = (newDebtor) => {
    setDebtors([newDebtor, ...debtors]);
  };

  // Función para eliminar o saldar la deuda cuando pagan
  const handleDeleteDebtor = (id) => {
    setDebtors(debtors.filter(d => d.id !== id));
  };

  const totalIncome = bookings.reduce((acc, curr) => acc + curr.grandTotal, 0);
  const totalPendingDebt = debtors.reduce((acc, curr) => acc + Number(curr.amount), 0);
  const activeBookingsCount = bookings.length;

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '1rem 0.75rem' }}>
      <Header />

      {/* Navegación de pestañas */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('reservas')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'reservas' ? 'var(--accent)' : '#1e293b',
            color: activeTab === 'reservas' ? '#0f172a' : '#f8fafc',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Gestión de Reservas & Cantina
        </button>
        <button 
          onClick={() => setActiveTab('morosos')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeTab === 'morosos' ? 'var(--accent)' : '#1e293b',
            color: activeTab === 'morosos' ? '#0f172a' : '#f8fafc',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          Control de Morosos Mensuales ({debtors.length})
        </button>
      </div>

      {activeTab === 'reservas' ? (
        <>
          <MetricsCards totalIncome={totalIncome} activeCount={activeBookingsCount} pendingDebt={totalPendingDebt} />
          <BookingForm onAddBooking={handleAddBooking} />
          <BookingList bookings={bookings} />
        </>
      ) : (
        <DebtorsModule debtors={debtors} onAddDebtor={handleAddDebtor} onDeleteDebtor={handleDeleteDebtor} />
      )}
    </div>
  );
} 