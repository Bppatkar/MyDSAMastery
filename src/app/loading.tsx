
export default function Loading() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-base)',
      pointerEvents: 'none',
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
        {/* Animated spinner */}
        <div style={{
          width: 36, height: 36,
          border: '3px solid var(--border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
        <span style={{ fontSize: 13, color: 'var(--tx-3)', letterSpacing: '0.04em' }}>Loading...</span>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}