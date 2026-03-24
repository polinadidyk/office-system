import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState(localStorage.getItem('userName') || 'Співробітник');
  const [email] = useState(localStorage.getItem('userEmail') || '');
  const [notifications, setNotifications] = useState(true);
  const [anonymous, setAnonymous] = useState(false);

  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      paddingBottom: '80px',
    },
    header: {
      background: '#F5F5F7',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: { fontSize: '17px', fontWeight: '600', color: '#111827' },
    brandName: { fontSize: '17px', fontWeight: '700', color: '#6366F1' },
    avatarWrap: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '24px 20px 20px',
    },
    avatar: {
      width: '80px',
      height: '80px',
      borderRadius: '50%',
      background: '#6366F1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '28px',
      fontWeight: '700',
      color: '#fff',
      marginBottom: '12px',
      position: 'relative',
    },
    avatarBadge: {
      position: 'absolute',
      bottom: '2px',
      right: '2px',
      width: '22px',
      height: '22px',
      background: '#6366F1',
      borderRadius: '50%',
      border: '2px solid #fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '11px',
    },
    userName: { fontSize: '20px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
    userEmail: { fontSize: '14px', color: '#6B7280', marginBottom: '10px' },
    roleBadge: {
      background: '#EEF2FF',
      color: '#6366F1',
      borderRadius: '20px',
      padding: '4px 14px',
      fontSize: '12px',
      fontWeight: '600',
    },
    statsRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '1px',
      background: '#E5E7EB',
      margin: '0 20px',
      borderRadius: '16px',
      overflow: 'hidden',
      marginBottom: '20px',
    },
    statItem: { background: '#fff', padding: '16px 8px', textAlign: 'center' },
    statNum: { fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
    statLabel: { fontSize: '11px', color: '#6B7280', fontWeight: '500' },
    statIcon: { fontSize: '16px', marginBottom: '4px' },
    section: {
      margin: '0 20px 16px',
      background: '#fff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    sectionTitle: {
      fontSize: '14px',
      fontWeight: '600',
      color: '#111827',
      padding: '16px 16px 8px',
    },
    row: {
      display: 'flex',
      alignItems: 'center',
      padding: '14px 16px',
      borderTop: '1px solid #F3F4F6',
      justifyContent: 'space-between',
    },
    rowLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    rowIcon: {
      width: '32px',
      height: '32px',
      background: '#F5F5F7',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '16px',
    },
    rowLabel: { fontSize: '15px', color: '#111827' },
    toggle: (on) => ({
      width: '44px',
      height: '26px',
      borderRadius: '13px',
      background: on ? '#6366F1' : '#D1D5DB',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s',
      border: 'none',
      outline: 'none',
      flexShrink: 0,
    }),
    toggleThumb: (on) => ({
      position: 'absolute',
      top: '3px',
      left: on ? '21px' : '3px',
      width: '20px',
      height: '20px',
      borderRadius: '50%',
      background: '#fff',
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }),
    myTicketsBtn: {
      margin: '0 20px 12px',
      background: '#6366F1',
      borderRadius: '16px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      border: 'none',
      width: 'calc(100% - 40px)',
      fontFamily: 'Inter, sans-serif',
    },
    myTicketsBtnLabel: { fontSize: '15px', fontWeight: '600', color: '#fff' },
    logoutRow: {
      margin: '0 20px',
      background: '#fff',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    logoutBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '16px',
      width: '100%',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
    },
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

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span style={{ fontSize: '22px', cursor: 'pointer', color: '#374151' }}>☰</span>
        <span style={s.headerTitle}>Профіль</span>
        <span style={s.brandName}>Office System</span>
      </div>

      <div style={s.avatarWrap}>
        <div style={s.avatar}>
          {initials || '?'}
          <div style={s.avatarBadge}>✓</div>
        </div>
        <div style={s.userName}>{name}</div>
        <div style={s.userEmail}>{email || 'пошта не вказана'}</div>
        <div style={s.roleBadge}>СПІВРОБІТНИК</div>
      </div>

      <div style={s.statsRow}>
        <div style={s.statItem}>
          <div style={s.statIcon}>📋</div>
          <div style={s.statNum}>—</div>
          <div style={s.statLabel}>ВСЬОГО</div>
        </div>
        <div style={s.statItem}>
          <div style={s.statIcon}>⏳</div>
          <div style={s.statNum}>—</div>
          <div style={s.statLabel}>В РОБОТІ</div>
        </div>
        <div style={s.statItem}>
          <div style={s.statIcon}>✅</div>
          <div style={s.statNum}>—</div>
          <div style={s.statLabel}>ВИКОНАНО</div>
        </div>
      </div>

      <button style={s.myTicketsBtn} onClick={() => navigate('/my-tickets')}>
        <span style={s.myTicketsBtnLabel}>📋 Мої запити</span>
        <span style={{ color: '#fff', fontSize: '18px' }}>→</span>
      </button>

      <div style={s.section}>
        <div style={s.sectionTitle}>Налаштування</div>
        <div style={s.row}>
          <div style={s.rowLeft}>
            <div style={s.rowIcon}>🔔</div>
            <span style={s.rowLabel}>Сповіщення</span>
          </div>
          <button style={s.toggle(notifications)} onClick={() => setNotifications((n) => !n)}>
            <div style={s.toggleThumb(notifications)} />
          </button>
        </div>
        <div style={s.row}>
          <div style={s.rowLeft}>
            <div style={s.rowIcon}>🕵️</div>
            <span style={s.rowLabel}>Анонімність за замовчуванням</span>
          </div>
          <button style={s.toggle(anonymous)} onClick={() => setAnonymous((a) => !a)}>
            <div style={s.toggleThumb(anonymous)} />
          </button>
        </div>
        <div style={s.row}>
          <div style={s.rowLeft}>
            <div style={s.rowIcon}>🌐</div>
            <span style={s.rowLabel}>Мова</span>
          </div>
          <span style={{ fontSize: '14px', color: '#9CA3AF' }}>UA / EN →</span>
        </div>
      </div>

      <div style={s.logoutRow}>
        <button
          style={s.logoutBtn}
          onClick={() => {
            localStorage.clear();
            navigate('/');
          }}>
          <div style={{ ...s.rowIcon, background: '#FEE2E2' }}>🚪</div>
          <span style={{ fontSize: '15px', color: '#DC2626', fontWeight: '500' }}>Вийти</span>
        </button>
      </div>

      <div style={{ height: '20px' }} />

      <div style={s.bottomNav}>
        <button
          onClick={() => navigate('/')}
          style={{
            flex: 1,
            padding: '10px 0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>⌂</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>HOME</span>
        </button>
        <button
          onClick={() => navigate('/my-tickets')}
          style={{
            flex: 1,
            padding: '10px 0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>📋</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>REQUESTS</span>
        </button>
        <button
          onClick={() => navigate('/profile')}
          style={{
            flex: 1,
            padding: '10px 0 8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '3px',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
          }}>
          <div
            style={{
              fontSize: '20px',
              background: '#6366F1',
              borderRadius: '10px',
              padding: '6px 14px',
              color: '#fff',
            }}>
            👤
          </div>
          <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: '600' }}>PROFILE</span>
        </button>
      </div>
    </div>
  );
}
