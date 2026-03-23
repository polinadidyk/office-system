import { useNavigate } from 'react-router-dom';

const requestTypes = [
  { type: 'order', icon: '🛒', label: 'Замовити', desc: 'Канцтовари, їжа, обладнання' },
  { type: 'problem', icon: '🔧', label: 'Проблема', desc: 'Зламалось, не працює, бруд' },
  { type: 'question', icon: '💬', label: 'Питання', desc: 'Уточнення до офіс-менеджера' },
  { type: 'idea', icon: '💡', label: 'Ідея / Фідбек', desc: 'Пропозиції та скарги' },
];

export default function Home() {
  const navigate = useNavigate();

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
    avatar: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: '#E0E7FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '18px',
      cursor: 'pointer',
    },
    body: { padding: '8px 20px 24px' },
    greeting: { fontSize: '28px', fontWeight: '700', color: '#111827', marginBottom: '4px' },
    subtitle: { fontSize: '15px', color: '#6B7280', marginBottom: '24px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' },
    card: {
      background: '#fff',
      borderRadius: '16px',
      padding: '18px 14px',
      cursor: 'pointer',
      border: '2px solid transparent',
      transition: 'all 0.15s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
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
    cardLabel: { fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '4px' },
    cardDesc: { fontSize: '12px', color: '#9CA3AF', lineHeight: '1.4' },
    myTickets: {
      background: '#fff',
      borderRadius: '16px',
      padding: '16px 18px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      cursor: 'pointer',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
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
      marginRight: '8px',
    },
    myTicketsArrow: { color: '#6366F1', fontSize: '20px', fontWeight: '600' },
    bottomNav: {
      position: 'fixed',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      maxWidth: '480px',
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
    gap: '3px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
  });

  return (
    <div style={s.page}>
      <div style={s.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '22px', cursor: 'pointer', color: '#374151' }}>☰</span>
          <span style={s.headerTitle}>Office System</span>
        </div>
        <div style={s.avatar} onClick={() => navigate('/profile')}>
          👤
        </div>
      </div>

      <div style={s.body}>
        <div style={s.greeting}>Привіт 👋</div>
        <div style={s.subtitle}>Чим можемо допомогти сьогодні?</div>

        <div style={s.grid}>
          {requestTypes.map(({ type, icon, label, desc }) => (
            <div
              key={type}
              style={s.card}
              onClick={() => navigate(`/form/${type}`)}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#6366F1';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(99,102,241,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.06)';
              }}>
              <div style={s.cardIcon}>{icon}</div>
              <div style={s.cardLabel}>{label}</div>
              <div style={s.cardDesc}>{desc}</div>
            </div>
          ))}
        </div>

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

      <div style={s.bottomNav}>
        <button onClick={() => navigate('/')} style={navBtn(true)}>
          <div
            style={{
              fontSize: '20px',
              background: '#6366F1',
              borderRadius: '10px',
              padding: '6px 14px',
              color: '#fff',
            }}>
            ⌂
          </div>
          <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: '600' }}>HOME</span>
        </button>
        <button onClick={() => navigate('/my-tickets')} style={navBtn(false)}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>📋</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>REQUESTS</span>
        </button>
        <button onClick={() => navigate('/profile')} style={navBtn(false)}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>👤</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>PROFILE</span>
        </button>
      </div>
    </div>
  );
}
