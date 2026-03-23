import { useNavigate, useParams } from 'react-router-dom';

export default function Success() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  const shortId = ticketId ? ticketId.slice(0, 8).toUpperCase() : '--------';

  return (
    <div
      style={{
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
      }}>
      <div
        style={{
          width: '80px',
          height: '80px',
          background: '#EEF2FF',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px',
          marginBottom: '24px',
        }}>
        ✅
      </div>

      <h1
        style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
        Запит надіслано!
      </h1>
      <p
        style={{
          fontSize: '15px',
          color: '#6B7280',
          textAlign: 'center',
          lineHeight: '1.5',
          marginBottom: '32px',
        }}>
        Офіс-менеджер отримав сповіщення і опрацює запит протягом робочого дня
      </p>

      <div
        style={{
          background: '#fff',
          borderRadius: '16px',
          padding: '20px',
          width: '100%',
          marginBottom: '24px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        }}>
        <div
          style={{
            fontSize: '12px',
            color: '#9CA3AF',
            fontWeight: '600',
            letterSpacing: '0.8px',
            marginBottom: '6px',
          }}>
          НОМЕР ЗАПИТУ
        </div>
        <div
          style={{ fontSize: '22px', fontWeight: '700', color: '#6366F1', letterSpacing: '2px' }}>
          #{shortId}
        </div>
      </div>

      <button
        onClick={() => navigate('/my-tickets')}
        style={{
          width: '100%',
          padding: '15px',
          background: '#6366F1',
          border: 'none',
          borderRadius: '14px',
          color: '#fff',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          marginBottom: '12px',
        }}>
        Переглянути мої запити
      </button>

      <button
        onClick={() => navigate('/')}
        style={{
          width: '100%',
          padding: '15px',
          background: '#fff',
          border: '1px solid #E5E7EB',
          borderRadius: '14px',
          color: '#374151',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
        }}>
        На головну
      </button>
    </div>
  );
}
