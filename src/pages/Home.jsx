import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmail } from '../lib/auth';
import Sidebar from '../components/Sidebar';

const requestTypes = [
  { type: 'order', icon: '🛒', label: 'Замовити', desc: 'Канцтовари, їжа, обладнання' },
  { type: 'problem', icon: '🔧', label: 'Проблема', desc: 'Зламалось, не працює, бруд' },
  { type: 'question', icon: '💬', label: 'Питання', desc: 'Уточнення до офіс-менеджера' },
  { type: 'idea', icon: '💡', label: 'Ідея / Фідбек', desc: 'Пропозиції та скарги' },
];


export default function Home() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const email = getEmail() || '';
  const rawName = email.split('@')[0] || '';
  const firstName = rawName.split('.')[0];
  const displayName = firstName
    ? firstName.charAt(0).toUpperCase() + firstName.slice(1)
    : '';
  const initials = rawName
    .split('.')
    .map((p) => p[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 2);

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '90px',
      position: 'relative',
      overflow: 'hidden',
    },
    header: {
      background: '#F5F5F7',
      padding: '14px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '10px' },
    menuBtn: { fontSize: '22px', cursor: 'pointer', color: '#374151', lineHeight: 1 },
    headerTitle: { fontSize: '16px', fontWeight: '700', color: '#111827' },
    avatar: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      background: '#6366F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '13px',
      fontWeight: '700',
      color: '#fff',
      cursor: 'pointer',
    },
    body: { padding: '4px 20px 24px' },
    greeting: { fontSize: '26px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
    subtitle: { fontSize: '14px', color: '#6B7280', marginBottom: '20px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' },
    card: {
      background: '#fff',
      borderRadius: '14px',
      padding: '16px 14px',
      cursor: 'pointer',
      borderLeft: '3px solid #6366F1',
      transition: 'all 0.15s',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    },
    cardIcon: {
      width: '40px',
      height: '40px',
      background: '#EEF2FF',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      marginBottom: '10px',
    },
    cardLabel: { fontSize: '14px', fontWeight: '600', color: '#111827', marginBottom: '4px' },
    cardDesc: { fontSize: '11px', color: '#9CA3AF', lineHeight: '1.5' },
    myTickets: {
      background: '#fff',
      borderRadius: '14px',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      borderLeft: '3px solid #6366F1',
      marginBottom: '28px',
    },
    myTicketsLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    myTicketsIcon: {
      width: '36px',
      height: '36px',
      background: '#EEF2FF',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
    },
    myTicketsLabel: { fontSize: '15px', fontWeight: '600', color: '#111827' },
    myTicketsBadge: {
      background: '#6366F1',
      color: '#fff',
      borderRadius: '20px',
      padding: '2px 10px',
      fontSize: '13px',
      fontWeight: '600',
    },
    myTicketsArrow: { color: '#6366F1', fontSize: '18px', fontWeight: '700', marginLeft: '8px' },
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '430px',
      maxWidth: '100%',
      background: '#fff',
      borderTop: '1px solid #E5E7EB',
      display: 'flex',
      zIndex: 100,
    },
  };

  const navBtn = (active) => ({
    flex: 1,
    padding: '10px 0 8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    fontFamily: 'Inter, sans-serif',
  });

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <div style={s.headerLeft}>
          <span style={s.menuBtn} onClick={() => setSidebarOpen(true)}>☰</span>
          <span style={s.headerTitle}>Office System</span>
        </div>
        <div style={s.avatar} onClick={() => navigate('/profile')}>
          {initials || '👤'}
        </div>
      </div>

      <div style={s.body}>
        {/* Greeting */}
        <div style={s.greeting}>
          {displayName ? `Привіт, ${displayName} 👋` : 'Привіт 👋'}
        </div>
        <div style={s.subtitle}>Чим можемо допомогти сьогодні?</div>

        {/* Request type grid */}
        <div style={s.grid}>
          {requestTypes.map(({ type, icon, label, desc }) => (
            <div
              key={type}
              style={s.card}
              onClick={() => navigate(`/form/${type}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(99,102,241,0.18)';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
                e.currentTarget.style.transform = 'none';
              }}>
              <div style={s.cardIcon}>{icon}</div>
              <div style={s.cardLabel}>{label}</div>
              <div style={s.cardDesc}>{desc}</div>
            </div>
          ))}
        </div>

        {/* My tickets row */}
        <div style={s.myTickets} onClick={() => navigate('/my-tickets')}>
          <div style={s.myTicketsLeft}>
            <div style={s.myTicketsIcon}>📋</div>
            <span style={s.myTicketsLabel}>Мої запити</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={s.myTicketsArrow}>→</span>
          </div>
        </div>

      </div>

      {/* Bottom nav */}
      <div style={s.bottomNav}>
        <button onClick={() => navigate('/')} style={navBtn(true)}>
          <div style={{
            background: '#6366F1',
            borderRadius: '10px',
            padding: '5px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span style={{ fontSize: '10px', color: '#6366F1', fontWeight: '700', letterSpacing: '0.3px' }}>HOME</span>
        </button>
        <button onClick={() => navigate('/my-tickets')} style={navBtn(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="8" y1="8" x2="16" y2="8" />
            <line x1="8" y1="12" x2="16" y2="12" />
            <line x1="8" y1="16" x2="13" y2="16" />
          </svg>
          <span style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.3px' }}>REQUESTS</span>
        </button>
        <button onClick={() => navigate('/profile')} style={navBtn(false)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span style={{ fontSize: '10px', color: '#9CA3AF', letterSpacing: '0.3px' }}>PROFILE</span>
        </button>
      </div>

      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
