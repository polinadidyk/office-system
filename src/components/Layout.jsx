export default function Layout({ children, maxWidth = '480px' }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#F5F5F7',
        fontFamily: 'Inter, -apple-system, sans-serif',
      }}>
      <div
        style={{
          maxWidth,
          margin: '0 auto',
          minHeight: '100vh',
          background: '#F5F5F7',
          position: 'relative',
        }}>
        {children}
      </div>
    </div>
  );
}
