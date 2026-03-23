import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const typeConfig = {
  order: {
    label: 'Замовити',
    icon: '🛒',
    badge: 'ЗАМОВИТИ',
    descLabel: 'ЩО ЗАМОВИТИ?',
    descPlaceholder: 'Наприклад: Маркери для дошки',
  },
  problem: {
    label: 'Проблема',
    icon: '🔧',
    badge: 'ПРОБЛЕМА',
    descLabel: 'ЩО СТАЛОСЬ?',
    descPlaceholder: 'Опиши що не працює...',
  },
  question: {
    label: 'Питання',
    icon: '❓',
    badge: 'ПИТАННЯ',
    descLabel: 'ТВОЄ ПИТАННЯ',
    descPlaceholder: 'Напиши своє питання...',
  },
  idea: {
    label: 'Ідея/фідбек',
    icon: '💡',
    badge: 'ІДЕЯ',
    descLabel: 'ТВОЯ ІДЕЯ',
    descPlaceholder: 'Розкажи свою ідею...',
  },
};

const priorities = ['Стандартний', 'Терміново', 'Не поспішає'];
const priorityIcons = { Стандартний: '🟡', Терміново: '🔴', 'Не поспішає': '🟢' };

export default function RequestForm() {
  const { type } = useParams();
  const navigate = useNavigate();
  const config = typeConfig[type] || typeConfig.idea;

  const [isAnonymous, setIsAnonymous] = useState(false);
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [object, setObject] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [priority, setPriority] = useState('Стандартний');
  const [showPriorityMenu, setShowPriorityMenu] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      color: '#1a1a1a',
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
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
    badge: {
      background: '#6366F1',
      color: '#fff',
      borderRadius: '20px',
      padding: '4px 12px',
      fontSize: '12px',
      fontWeight: '700',
      letterSpacing: '0.5px',
    },
    body: { padding: '24px 20px' },
    pageTitle: {
      fontSize: '26px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      textAlign: 'center',
    },
    pageSubtitle: {
      fontSize: '14px',
      color: '#6B7280',
      lineHeight: '1.5',
      marginBottom: '28px',
      textAlign: 'center',
    },
    fieldLabel: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#6B7280',
      letterSpacing: '0.8px',
      marginBottom: '8px',
      display: 'block',
      textAlign: 'center',
    },
    input: {
      width: '100%',
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '14px 16px',
      color: '#111827',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
    },
    textarea: {
      width: '100%',
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '14px 16px',
      color: '#111827',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
      resize: 'none',
      minHeight: '110px',
      lineHeight: '1.5',
    },
    group: { marginBottom: '20px' },
    priorityBlock: {
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      cursor: 'pointer',
      position: 'relative',
    },
    priorityLabel: {
      fontSize: '10px',
      fontWeight: '700',
      color: '#6B7280',
      letterSpacing: '0.8px',
      marginBottom: '2px',
    },
    priorityValue: { fontSize: '15px', fontWeight: '600', color: '#111827' },
    priorityMenu: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      marginTop: '4px',
      zIndex: 10,
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    },
    priorityItem: {
      padding: '12px 16px',
      fontSize: '15px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    anonRow: {
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '12px',
      marginBottom: '20px',
    },
    anonText: { flex: 1 },
    anonTitle: { fontSize: '15px', fontWeight: '600', color: '#111827', marginBottom: '4px' },
    anonDesc: { fontSize: '13px', color: '#6B7280', lineHeight: '1.4' },
    toggleTrack: (on) => ({
      width: '48px',
      height: '28px',
      borderRadius: '14px',
      background: on ? '#6366F1' : '#D1D5DB',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background 0.2s',
      flexShrink: 0,
      border: 'none',
      outline: 'none',
    }),
    toggleThumb: (on) => ({
      position: 'absolute',
      top: '3px',
      left: on ? '23px' : '3px',
      width: '22px',
      height: '22px',
      borderRadius: '50%',
      background: '#fff',
      transition: 'left 0.2s',
      boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    }),
    submitBtn: {
      width: '100%',
      padding: '16px',
      background: '#6366F1',
      border: 'none',
      borderRadius: '14px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      marginBottom: '12px',
    },
    footerNote: { textAlign: 'center', fontSize: '12px', color: '#9CA3AF', lineHeight: '1.4' },
    error: { color: '#EF4444', fontSize: '13px', marginBottom: '12px', textAlign: 'center' },
    quantityRow: { display: 'flex', alignItems: 'center', gap: '12px' },
    qtyBtn: {
      width: '36px',
      height: '36px',
      borderRadius: '50%',
      border: '1px solid #E5E7EB',
      background: '#fff',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#374151',
      flexShrink: 0,
    },
    qtyInput: {
      flex: 1,
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '12px 16px',
      color: '#111827',
      fontSize: '15px',
      outline: 'none',
      textAlign: 'center',
      fontFamily: 'Inter, sans-serif',
    },
  };

  async function handleSubmit() {
    if (!description.trim()) {
      setError('Будь ласка, заповни основне поле');
      return;
    }
    if (!isAnonymous && !email.trim()) {
      setError('Вкажи свою пошту або обери анонімно');
      return;
    }
    setLoading(true);
    setError('');
    const fullDesc =
      type === 'order' || type === 'problem'
        ? `${description}${type === 'order' && quantity > 1 ? ` (кількість: ${quantity})` : ''}${comment ? `\nКоментар: ${comment}` : ''}\nПріоритет: ${priority}`
        : `${description}${comment ? `\nКоментар: ${comment}` : ''}`;
    const { data, error: err } = await supabase
      .from('tickets')
      .insert({
        type,
        email: isAnonymous ? null : email,
        is_anonymous: isAnonymous,
        description: fullDesc,
        object: type === 'problem' ? object : null,
        status: 'new',
      })
      .select()
      .single();
    setLoading(false);
    if (err) {
      setError('Помилка при відправці. Спробуй ще раз.');
      return;
    }
    navigate(`/success/${data.id}`);
  }

  return (
    <div style={s.page}>
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => navigate('/')}>
          ←
        </button>
        <span style={s.headerTitle}>Новий запит</span>
        <span style={s.badge}>{config.badge}</span>
      </div>

      <div style={s.body}>
        <div style={s.pageTitle}>Створення запиту</div>
        <div style={s.pageSubtitle}>
          Заповніть деталі вашого запиту для офіс-менеджера. Ми опрацюємо його протягом робочого
          дня.
        </div>

        <div style={s.group}>
          <label style={s.fieldLabel}>{config.descLabel}</label>
          <input
            style={s.input}
            placeholder={config.descPlaceholder}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {type === 'problem' && (
          <div style={s.group}>
            <label style={s.fieldLabel}>ОБ'ЄКТ</label>
            <input
              style={s.input}
              placeholder="Принтер, кофемашина..."
              value={object}
              onChange={(e) => setObject(e.target.value)}
            />
          </div>
        )}

        {type === 'order' && (
          <div style={s.group}>
            <label style={s.fieldLabel}>КІЛЬКІСТЬ</label>
            <div style={s.quantityRow}>
              <button style={s.qtyBtn} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                −
              </button>
              <input
                style={s.qtyInput}
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              />
              <button style={s.qtyBtn} onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
          </div>
        )}

        {(type === 'order' || type === 'problem') && (
          <div style={s.group}>
            <label style={s.fieldLabel}>ПРІОРИТЕТ</label>
            <div style={s.priorityBlock} onClick={() => setShowPriorityMenu((m) => !m)}>
              <span style={{ fontSize: '20px' }}>{priorityIcons[priority]}</span>
              <div>
                <div style={s.priorityLabel}>ПРІОРИТЕТ</div>
                <div style={s.priorityValue}>{priority}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: '#9CA3AF' }}>›</span>
              {showPriorityMenu && (
                <div style={s.priorityMenu}>
                  {priorities.map((p) => (
                    <div
                      key={p}
                      style={s.priorityItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        setPriority(p);
                        setShowPriorityMenu(false);
                      }}>
                      <span>{priorityIcons[p]}</span> {p}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={s.group}>
          <label style={s.fieldLabel}>НАВІЩО / КОМЕНТАР</label>
          <textarea
            style={s.textarea}
            placeholder="Будь ласка, вкажіть додаткові деталі якщо потрібно..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {!isAnonymous && (
          <div style={s.group}>
            <label style={s.fieldLabel}>ТВОЯ КОРПОРАТИВНА ПОШТА</label>
            <input
              style={s.input}
              type="email"
              placeholder="name@tech-stack.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        )}

        <div style={s.anonRow}>
          <div style={s.anonText}>
            <div style={s.anonTitle}>Надіслати анонімно</div>
            <div style={s.anonDesc}>
              Ваше ім'я не буде відображатися менеджеру в списку активних запитів.
            </div>
          </div>
          <button style={s.toggleTrack(isAnonymous)} onClick={() => setIsAnonymous((a) => !a)}>
            <div style={s.toggleThumb(isAnonymous)} />
          </button>
        </div>

        {error && <div style={s.error}>{error}</div>}

        <button style={s.submitBtn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Надсилаємо...' : 'Надіслати запит'} {!loading && '→'}
        </button>

        <div style={s.footerNote}>
          Натискаючи "Надіслати", ви погоджуєтесь з правилами Office System OS
        </div>
      </div>
    </div>
  );
}
