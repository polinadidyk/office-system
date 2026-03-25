import { useNavigate, useLocation } from 'react-router-dom';
import { logout, getEmail } from '../lib/auth';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ListIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const UserIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HelpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const navItems = [
  { icon: <HomeIcon />, label: 'Головна', path: '/' },
  { icon: <ListIcon />, label: 'Мої запити', path: '/my-tickets' },
  { icon: <UserIcon />, label: 'Профіль', path: '/profile' },
];

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const email = getEmail() || '';
  const rawName = email.split('@')[0] || 'Співробітник';
  const name = rawName
    .split('.')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const initials = name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);

  const go = (path) => { onClose(); navigate(path); };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 200,
          }}
        />
      )}

      {/* Drawer panel */}
      <div
        style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: '280px',
          background: '#F5F5F7',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s ease',
          boxSizing: 'border-box',
        }}>

        {/* User info — left aligned */}
        <div style={{ padding: '28px 20px 20px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: '#6366F1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '700',
              color: '#fff',
            }}>
            {initials || '?'}
          </div>
          <div style={{ marginTop: '12px', fontSize: '18px', fontWeight: '700', color: '#111' }}>
            {name}
          </div>
          <div style={{ marginTop: '2px', fontSize: '13px', color: '#666' }}>
            {email}
          </div>
          <div
            style={{
              display: 'inline-block',
              marginTop: '6px',
              background: '#EEF2FF',
              color: '#6366F1',
              borderRadius: '20px',
              padding: '3px 10px',
              fontSize: '11px',
              fontWeight: '600',
            }}>
            СПІВРОБІТНИК
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#E5E7EB', margin: '0 20px 8px' }} />

        {/* Nav items */}
        <div style={{ flex: 1, padding: '4px 0' }}>
          {navItems.map(({ icon, label, path }) => {
            const active = location.pathname === path;
            return (
              <button
                key={path}
                onClick={() => go(path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '14px 16px',
                  background: active ? '#EEEEFF' : 'transparent',
                  borderLeft: active ? '3px solid #6366F1' : '3px solid transparent',
                  borderTop: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  borderRadius: active ? '0 8px 8px 0' : '0',
                  cursor: 'pointer',
                  fontFamily: 'Inter, -apple-system, sans-serif',
                  fontSize: '15px',
                  color: active ? '#6366F1' : '#333',
                  fontWeight: active ? '600' : '400',
                  textAlign: 'left',
                }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {icon}
                  {label}
                </span>
                <span style={{ color: '#999', fontSize: '14px' }}>›</span>
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: '#E5E7EB', margin: '0 20px 8px' }} />

        {/* Bottom section */}
        <div style={{ padding: '8px 16px 28px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {/* New request */}
          <button
            onClick={() => go('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              width: '100%',
              padding: '12px 16px',
              background: '#EEF2FF',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '15px',
              fontWeight: '600',
              color: '#6366F1',
              marginBottom: '4px',
            }}>
            <PlusIcon />
            Новий запит
          </button>

          {/* Help */}
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '14px 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '15px',
              color: '#333',
            }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HelpIcon />
              Допомога / FAQ
            </span>
            <span style={{ color: '#999', fontSize: '14px' }}>›</span>
          </button>

          {/* Logout */}
          <button
            onClick={() => { logout(); navigate('/login'); }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              width: '100%',
              padding: '14px 16px',
              background: 'transparent',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'Inter, -apple-system, sans-serif',
              fontSize: '15px',
              color: '#EF4444',
            }}>
            <LogoutIcon />
            Вийти
          </button>
        </div>
      </div>
    </>
  );
}
