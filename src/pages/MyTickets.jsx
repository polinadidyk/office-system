import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

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
  const [email, setEmail] = useState(localStorage.getItem('userEmail') || '');
  const [inputEmail, setInputEmail] = useState('');
  const [showInput, setShowInput] = useState(!localStorage.getItem('userEmail'));

  useEffect(() => {
    if (email) loadTickets(email);
    else setLoading(false);
  }, [email]);

  async function loadTickets(userEmail) {
    setLoading(true);
    const { data } = await supabase
      .from('tickets')
      .select('*')
      .eq('email', userEmail)
      .order('created_at', { ascending: false });
    setTickets(data || []);
    setLoading(false);
  }

  function handleEmailSubmit() {
    if (!inputEmail.trim()) return;
    localStorage.setItem('userEmail', inputEmail.trim());
    setEmail(inputEmail.trim());
    setShowInput(false);
  }

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
    emailCard: {
      background: '#fff',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    emailTitle: { fontSize: '17px', fontWeight: '600', color: '#111827', marginBottom: '8px' },
    emailDesc: { fontSize: '14px', color: '#6B7280', marginBottom: '16px', lineHeight: '1.5' },
    input: {
      width: '100%',
      background: '#F5F5F7',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '12px 16px',
      color: '#111827',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
      marginBottom: '12px',
    },
    btn: {
      width: '100%',
      padding: '13px',
      background: '#6366F1',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '15px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    ticketCard: {
      background: '#fff',
      borderRadius: '16px',
      padding: '16px',
      marginBottom: '12px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      cursor: 'pointer',
    },
    ticketTop: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '8px',
    },
    ticketType: { fontSize: '13px', fontWeight: '600', color: '#6B7280' },
    statusBadge: (status) => ({
      display: 'inline-block',
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: statusConfig[status]?.bg || '#F3F4F6',
      color: statusConfig[status]?.color || '#374151',
    }),
    ticketDesc: { fontSize: '15px', color: '#111827', lineHeight: '1.4', marginBottom: '8px' },
    ticketDate: { fontSize: '12px', color: '#9CA3AF' },
    ticketComment: {
      background: '#FEF3C7',
      borderRadius: '8px',
      padding: '8px 12px',
      fontSize: '13px',
      color: '#92400E',
      marginTop: '8px',
    },
    emptyState: { textAlign: 'center', padding: '48px 24px' },
    emptyIcon: { fontSize: '48px', marginBottom: '16px' },
    emptyTitle: { fontSize: '18px', fontWeight: '600', color: '#111827', marginBottom: '8px' },
    emptyDesc: { fontSize: '14px', color: '#6B7280', marginBottom: '24px' },
    changeEmail: { textAlign: 'right', marginBottom: '12px' },
    changeEmailBtn: {
      background: 'none',
      border: 'none',
      color: '#6366F1',
      fontSize: '13px',
      cursor: 'pointer',
      fontWeight: '600',
    },
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
        {showInput ? (
          <div style={s.emailCard}>
            <div style={s.emailTitle}>Вкажи свою пошту</div>
            <div style={s.emailDesc}>
              Щоб побачити свої запити, введи корпоративну пошту яку вказував при створенні запиту.
            </div>
            <input
              style={s.input}
              type="email"
              placeholder="name@tech-stack.com"
              value={inputEmail}
              onChange={(e) => setInputEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleEmailSubmit()}
            />
            <button style={s.btn} onClick={handleEmailSubmit}>
              Показати мої запити
            </button>
          </div>
        ) : (
          <>
            <div style={s.changeEmail}>
              <button
                style={s.changeEmailBtn}
                onClick={() => {
                  setShowInput(true);
                  setEmail('');
                  localStorage.removeItem('userEmail');
                }}>
                Змінити пошту
              </button>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '48px', color: '#9CA3AF' }}>
                Завантажуємо...
              </div>
            ) : tickets.length === 0 ? (
              <div style={s.emptyState}>
                <div style={s.emptyIcon}>📭</div>
                <div style={s.emptyTitle}>Запитів поки немає</div>
                <div style={s.emptyDesc}>Твої запити з'являться тут після відправки</div>
                <button
                  style={{ ...s.btn, width: 'auto', padding: '12px 24px' }}
                  onClick={() => navigate('/')}>
                  Створити запит
                </button>
              </div>
            ) : (
              tickets.map((ticket) => (
                <div key={ticket.id} style={s.ticketCard}>
                  <div style={s.ticketTop}>
                    <span style={s.ticketType}>{typeLabels[ticket.type] || ticket.type}</span>
                    <span style={s.statusBadge(ticket.status)}>
                      {statusConfig[ticket.status]?.label || ticket.status}
                    </span>
                  </div>
                  <div style={s.ticketDesc}>{ticket.description}</div>
                  {ticket.object && (
                    <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '4px' }}>
                      Об'єкт: {ticket.object}
                    </div>
                  )}
                  <div style={s.ticketDate}>
                    {new Date(ticket.created_at).toLocaleDateString('uk-UA', {
                      day: 'numeric',
                      month: 'long',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                  {ticket.comment && <div style={s.ticketComment}>💬 {ticket.comment}</div>}
                </div>
              ))
            )}
          </>
        )}
      </div>

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
        <button
          onClick={() => navigate('/admin')}
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
          <div style={{ fontSize: '20px', color: '#9CA3AF' }}>👤</div>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>PROFILE</span>
        </button>
      </div>
    </div>
  );
}
