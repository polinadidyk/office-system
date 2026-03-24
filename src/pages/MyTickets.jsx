import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { getEmail } from '../lib/auth';

const statusConfig = {
  new: { label: 'Новий', bg: '#EEF2FF', color: '#6366F1' },
  progress: { label: 'В роботі', bg: '#FEF3C7', color: '#D97706' },
  done: { label: 'Виконано', bg: '#D1FAE5', color: '#059669' },
  rejected: { label: 'Відхилено', bg: '#FEE2E2', color: '#DC2626' },
};

const typeLabels = {
  order: '🛒 Замовити',
  problem: '🔧 Проблема',
  question: '❓ Питання',
  idea: '💡 Ідея',
};

export default function MyTickets() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = getEmail();

  useEffect(() => {
    if (email) loadTickets();
    else setLoading(false);
  }, [email]);

  async function loadTickets() {
    setLoading(true);
    const { data } = await supabase
      .from('tickets')
      .select('*')
      .eq('email', email)
      .order('created_at', { ascending: false });
    setTickets(data || []);
    setLoading(false);
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      fontFamily: 'Inter, -apple-system, sans-serif',
      paddingBottom: '80px',
    },
    header: {
      background: '#fff',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E5E7EB',
    },
    backBtn: {
      background: 'none',
      border: 'none',
      fontSize: '22px',
      cursor: 'pointer',
      color: '#374151',
      padding: '0',
    },
    headerTitle: { fontWeight: '600', fontSize: '17px', color: '#111827' },
    body: { padding: '20px' },
    card: {
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    cardTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px',
    },
    cardType: { fontSize: '13px', fontWeight: '600', color: '#6B7280' },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: statusConfig[status]?.bg || '#F3F4F6',
      color: statusConfig[status]?.color || '#374151',
    }),
    cardDesc: { fontSize: '15px', color: '#111827', lineHeight: '1.4', marginBottom: '8px' },
    cardDate: { fontSize: '12px', color: '#9CA3AF' },
    cardComment: {
      background: '#FEF3C7',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '13px',
      color: '#92400E',
      marginTop: '8px',
    },
    empty: { textAlign: 'center', padding: '48px 24px' },
    emptyIcon: { fontSize: '48px', marginBottom: '16px' },
    emptyTitle: { fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' },
    emptyDesc: { fontSize: '14px', color: '#6B7280', marginBottom: '24px' },
    btn: {
      padding: '12px 24px',
      background: '#6366F1',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
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
        <button style={s.backBtn} onClick={() => navigate('/')}>
          ←
        </button>
        <span style={s.headerTitle}>Мої запити</span>
        <div style={{ width: '24px' }} />
      </div>

      <div style={s.body}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px', color: '#9CA3AF' }}>
            Завантажуємо...
          </div>
        ) : tickets.length === 0 ? (
          <div style={s.empty}>
            <div style={s.emptyIcon}>📭</div>
            <div style={s.emptyTitle}>Запитів поки немає</div>
            <div style={s.emptyDesc}>Твої запити з'являться тут після відправки</div>
            <button style={s.btn} onClick={() => navigate('/')}>
              Створити запит
            </button>
          </div>
        ) : (
          tickets.map((ticket) => (
            <div key={ticket.id} style={s.card}>
              <div style={s.cardTop}>
                <span style={s.cardType}>{typeLabels[ticket.type] || ticket.type}</span>
                <span style={s.statusBadge(ticket.status)}>
                  {statusConfig[ticket.status]?.label || ticket.status}
                </span>
              </div>
              <div style={s.cardDesc}>{ticket.description}</div>
              {ticket.object && (
                <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                  Об'єкт: {ticket.object}
                </div>
              )}
              <div style={s.cardDate}>
                {new Date(ticket.created_at).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'long',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              {ticket.comment && <div style={s.cardComment}>💬 {ticket.comment}</div>}
            </div>
          ))
        )}
      </div>

      <div style={s.bottomNav}>
        <button onClick={() => navigate('/')} style={navBtn(false)}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>⌂</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>HOME</span>
        </button>
        <button onClick={() => navigate('/my-tickets')} style={navBtn(true)}>
          <div
            style={{
              fontSize: '20px',
              background: '#6366F1',
              borderRadius: '10px',
              padding: '6px 14px',
              color: '#fff',
            }}>
            📋
          </div>
          <span style={{ fontSize: '11px', color: '#6366F1', fontWeight: '600' }}>REQUESTS</span>
        </button>
        <button onClick={() => navigate('/profile')} style={navBtn(false)}>
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>👤</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>PROFILE</span>
        </button>
      </div>
    </div>
  );
}
