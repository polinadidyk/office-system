import { useState, useEffect, useCallback } from 'react';
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

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [comments, setComments] = useState({});

  const loadTickets = useCallback(async () => {
    const { data } = await supabase
      .from('tickets')
      .select('*')
      .order('created_at', { ascending: false });
    setTickets(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadTickets();
    const channel = supabase
      .channel('tickets-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tickets' }, () =>
        loadTickets(),
      )
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, [loadTickets]);

  async function updateStatus(id, status) {
    await supabase.from('tickets').update({ status }).eq('id', id);
    loadTickets();
  }

  async function saveComment(id) {
    await supabase.from('tickets').update({ comment: comments[id] }).eq('id', id);
    loadTickets();
  }

  const filtered = filter === 'all' ? tickets : tickets.filter((t) => t.status === filter);
  const counts = {
    new: tickets.filter((t) => t.status === 'new').length,
    progress: tickets.filter((t) => t.status === 'progress').length,
    done: tickets.filter((t) => t.status === 'done').length,
  };

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto',
      paddingBottom: '40px',
    },
    header: {
      background: '#fff',
      padding: '16px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #E5E7EB',
    },
    headerTitle: { fontWeight: '700', fontSize: '18px', color: '#111827' },
    logoutBtn: {
      background: 'none',
      border: '1px solid #E5E7EB',
      borderRadius: '8px',
      padding: '6px 12px',
      fontSize: '13px',
      color: '#6B7280',
      cursor: 'pointer',
    },
    metrics: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '12px',
      padding: '16px 20px',
    },
    metricCard: (color) => ({
      background: '#fff',
      borderRadius: '14px',
      padding: '16px',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      borderTop: `3px solid ${color}`,
    }),
    metricNum: { fontSize: '28px', fontWeight: '700', color: '#111827' },
    metricLabel: { fontSize: '12px', color: '#6B7280', marginTop: '2px' },
    filters: { display: 'flex', gap: '8px', padding: '0 20px 16px', overflowX: 'auto' },
    filterBtn: (active) => ({
      padding: '7px 16px',
      borderRadius: '20px',
      border: 'none',
      background: active ? '#6366F1' : '#fff',
      color: active ? '#fff' : '#6B7280',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    }),
    body: { padding: '0 20px' },
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
      padding: '3px 10px',
      borderRadius: '20px',
      fontSize: '12px',
      fontWeight: '600',
      background: statusConfig[status]?.bg,
      color: statusConfig[status]?.color,
    }),
    cardDesc: { fontSize: '15px', color: '#111827', lineHeight: '1.4', marginBottom: '8px' },
    cardMeta: { fontSize: '12px', color: '#9CA3AF', marginBottom: '12px' },
    select: {
      width: '100%',
      padding: '10px 14px',
      border: '1px solid #E5E7EB',
      borderRadius: '10px',
      fontSize: '14px',
      color: '#111827',
      background: '#F5F5F7',
      outline: 'none',
      marginBottom: '8px',
      fontFamily: 'Inter, sans-serif',
    },
    commentRow: { display: 'flex', gap: '8px' },
    commentInput: {
      flex: 1,
      padding: '10px 14px',
      border: '1px solid #E5E7EB',
      borderRadius: '10px',
      fontSize: '14px',
      color: '#111827',
      background: '#F5F5F7',
      outline: 'none',
      fontFamily: 'Inter, sans-serif',
    },
    commentBtn: {
      padding: '10px 16px',
      background: '#6366F1',
      border: 'none',
      borderRadius: '10px',
      color: '#fff',
      fontSize: '13px',
      fontWeight: '600',
      cursor: 'pointer',
    },
    empty: { textAlign: 'center', padding: '48px', color: '#9CA3AF', fontSize: '15px' },
  };

  return (
    <div style={s.page}>
      <div style={s.header}>
        <span style={s.headerTitle}>Дашборд менеджера</span>
        <button style={s.logoutBtn} onClick={() => navigate('/admin')}>
          Вийти
        </button>
      </div>

      <div style={s.metrics}>
        <div style={s.metricCard('#6366F1')}>
          <div style={s.metricNum}>{counts.new}</div>
          <div style={s.metricLabel}>Нових</div>
        </div>
        <div style={s.metricCard('#D97706')}>
          <div style={s.metricNum}>{counts.progress}</div>
          <div style={s.metricLabel}>В роботі</div>
        </div>
        <div style={s.metricCard('#059669')}>
          <div style={s.metricNum}>{counts.done}</div>
          <div style={s.metricLabel}>Виконано</div>
        </div>
      </div>

      <div style={s.filters}>
        {[
          ['all', 'Всі'],
          ['new', 'Нові'],
          ['progress', 'В роботі'],
          ['done', 'Виконано'],
          ['rejected', 'Відхилено'],
        ].map(([val, lbl]) => (
          <button key={val} style={s.filterBtn(filter === val)} onClick={() => setFilter(val)}>
            {lbl}
          </button>
        ))}
      </div>

      <div style={s.body}>
        {loading ? (
          <div style={s.empty}>Завантажуємо...</div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>Запитів немає</div>
        ) : (
          filtered.map((ticket) => (
            <div key={ticket.id} style={s.card}>
              <div style={s.cardTop}>
                <span style={s.cardType}>{typeLabels[ticket.type] || ticket.type}</span>
                <span style={s.statusBadge(ticket.status)}>
                  {statusConfig[ticket.status]?.label}
                </span>
              </div>
              <div style={s.cardDesc}>{ticket.description}</div>
              <div style={s.cardMeta}>
                {ticket.is_anonymous ? '👤 Анонімно' : `✉️ ${ticket.email}`}
                {ticket.object && ` · 📍 ${ticket.object}`}
                {' · '}
                {new Date(ticket.created_at).toLocaleDateString('uk-UA', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <select
                style={s.select}
                value={ticket.status}
                onChange={(e) => updateStatus(ticket.id, e.target.value)}>
                <option value="new">Новий</option>
                <option value="progress">В роботі</option>
                <option value="done">Виконано</option>
                <option value="rejected">Відхилено</option>
              </select>
              <div style={s.commentRow}>
                <input
                  style={s.commentInput}
                  placeholder="Коментар для співробітника..."
                  defaultValue={ticket.comment || ''}
                  onChange={(e) => setComments((c) => ({ ...c, [ticket.id]: e.target.value }))}
                />
                <button style={s.commentBtn} onClick={() => saveComment(ticket.id)}>
                  Зберегти
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
