import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPin, loginAdmin, logout } from '../lib/auth';

export default function AdminPin() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  function pressNum(num) {
    if (pin.length >= 4) return;
    const newPin = pin + num;
    setPin(newPin);
    setError('');
    if (newPin.length === 4) {
      setTimeout(() => {
        if (checkPin(newPin)) {
          loginAdmin();
          navigate('/admin/dashboard');
        } else {
          setError('Невірний PIN-код');
          setPin('');
        }
      }, 200);
    }
  }

  const s = {
    page: {
      minHeight: '100vh',
      background: '#F5F5F7',
      fontFamily: 'Inter, -apple-system, sans-serif',
      maxWidth: '480px',
      margin: '0 auto',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    },
    logo: {
      width: '72px',
      height: '72px',
      background: '#6366F1',
      borderRadius: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: '800',
      fontSize: '28px',
      color: '#fff',
      marginBottom: '24px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#111827',
      marginBottom: '8px',
      textAlign: 'center',
    },
    subtitle: { fontSize: '14px', color: '#6B7280', marginBottom: '48px', textAlign: 'center' },
    pinRow: { display: 'flex', gap: '16px', marginBottom: '16px' },
    pinDot: (filled) => ({
      width: '18px',
      height: '18px',
      borderRadius: '50%',
      background: filled ? '#6366F1' : '#E5E7EB',
      transition: 'background 0.15s',
    }),
    error: {
      color: '#EF4444',
      fontSize: '14px',
      marginBottom: '24px',
      textAlign: 'center',
      minHeight: '20px',
    },
    numpad: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '12px',
      width: '100%',
      maxWidth: '280px',
      marginBottom: '32px',
    },
    numBtn: {
      padding: '20px',
      background: '#fff',
      border: '1px solid #E5E7EB',
      borderRadius: '16px',
      fontSize: '22px',
      fontWeight: '600',
      color: '#111827',
      cursor: 'pointer',
      textAlign: 'center',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    emptyBtn: { padding: '20px', background: 'transparent', border: 'none' },
    deleteBtn: {
      padding: '20px',
      background: 'transparent',
      border: 'none',
      fontSize: '22px',
      color: '#6B7280',
      cursor: 'pointer',
    },
    backLink: {
      color: '#6366F1',
      fontSize: '14px',
      cursor: 'pointer',
      background: 'none',
      border: 'none',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '500',
    },
  };

  return (
    <div style={s.page}>
      <div style={s.logo}>OS</div>
      <div style={s.title}>Вхід для менеджера</div>
      <div style={s.subtitle}>Введи PIN-код для доступу до дашборду</div>

      <div style={s.pinRow}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={s.pinDot(pin.length > i)} />
        ))}
      </div>

      <div style={s.error}>{error}</div>

      <div style={s.numpad}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <button key={n} style={s.numBtn} onClick={() => pressNum(String(n))}>
            {n}
          </button>
        ))}
        <div style={s.emptyBtn} />
        <button style={s.numBtn} onClick={() => pressNum('0')}>
          0
        </button>
        <button style={s.deleteBtn} onClick={() => setPin((p) => p.slice(0, -1))}>
          ⌫
        </button>
      </div>

      <button
        style={s.backLink}
        onClick={() => {
          logout();
          navigate('/login');
        }}>
        ← Повернутись на головну
      </button>
    </div>
  );
}
