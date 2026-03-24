import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail, isAdminEmail, loginUser } from '../lib/auth';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  function handleLogin() {
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) {
      setError('Введи свою пошту');
      return;
    }
    if (!isValidEmail(trimmed)) {
      setError('Тільки для співробітників Techstack (@tech-stack.io)');
      return;
    }
    loginUser(trimmed);
    if (isAdminEmail(trimmed)) {
      navigate('/admin/pin');
    } else {
      navigate('/');
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
      fontSize: '32px',
      marginBottom: '16px',
    },
    brand: { fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '6px' },
    tagline: { fontSize: '14px', color: '#6B7280', marginBottom: '48px', textAlign: 'center' },
    card: {
      background: '#fff',
      borderRadius: '20px',
      padding: '28px 24px',
      width: '100%',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    },
    iconWrap: {
      width: '64px',
      height: '64px',
      background: '#EEF2FF',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      fontSize: '28px',
    },
    title: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#111827',
      textAlign: 'center',
      marginBottom: '8px',
    },
    subtitle: {
      fontSize: '14px',
      color: '#6B7280',
      textAlign: 'center',
      lineHeight: '1.5',
      marginBottom: '24px',
    },
    label: {
      fontSize: '11px',
      fontWeight: '700',
      color: '#6B7280',
      letterSpacing: '0.8px',
      marginBottom: '8px',
      display: 'block',
    },
    input: {
      width: '100%',
      background: '#F5F5F7',
      border: '1.5px solid #E5E7EB',
      borderRadius: '12px',
      padding: '14px 16px',
      color: '#111827',
      fontSize: '15px',
      outline: 'none',
      boxSizing: 'border-box',
      fontFamily: 'Inter, sans-serif',
      marginBottom: '12px',
    },
    btn: {
      width: '100%',
      padding: '15px',
      background: '#6366F1',
      border: 'none',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginBottom: '16px',
    },
    error: { color: '#EF4444', fontSize: '13px', marginBottom: '12px', textAlign: 'center' },
    footer: { fontSize: '12px', color: '#9CA3AF', textAlign: 'center', lineHeight: '1.5' },
  };

  return (
    <div style={s.page}>
      <div style={s.logo}>⊞</div>
      <div style={s.brand}>Office System</div>
      <div style={s.tagline}>Внутрішній сервіс Techstack</div>

      <div style={s.card}>
        <div style={s.iconWrap}>📧</div>
        <div style={s.title}>Увійдіть щоб продовжити</div>
        <div style={s.subtitle}>
          Введіть корпоративну пошту щоб надіслати запит або перевірити статус
        </div>

        <label style={s.label}>КОРПОРАТИВНА ПОШТА</label>
        <input
          style={s.input}
          type="email"
          placeholder="name@tech-stack.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
          autoFocus
        />

        {error && <div style={s.error}>{error}</div>}

        <button style={s.btn} onClick={handleLogin}>
          Увійти →
        </button>

        <div style={s.footer}>Тільки для співробітників Techstack · Ваші дані захищені</div>
      </div>
    </div>
  );
}
