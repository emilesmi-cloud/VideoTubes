import React, { useState } from 'react';

const styles = {
  navbar: {
    display: 'flex', alignItems: 'center', gap: 16,
    background: 'var(--bg)', borderBottom: '0.5px solid var(--border)',
    padding: '10px 20px', position: 'sticky', top: 0, zIndex: 100,
  },
  logo: {
    display: 'flex', alignItems: 'center', gap: 8,
    fontSize: 20, fontWeight: 600, color: 'var(--red)',
    flexShrink: 0, cursor: 'pointer',
  },
  logoIcon: { fontSize: 26 },
  searchBar: { flex: 1, display: 'flex', maxWidth: 500 },
  searchInput: {
    flex: 1, border: '0.5px solid var(--border)', borderRight: 'none',
    borderRadius: '8px 0 0 8px', padding: '9px 16px', fontSize: 14,
    background: 'var(--bg2)', color: 'var(--text)', outline: 'none',
  },
  searchBtn: {
    border: '0.5px solid var(--border)', borderRadius: '0 8px 8px 0',
    padding: '9px 18px', background: 'var(--bg2)', color: 'var(--text)',
    fontSize: 16, display: 'flex', alignItems: 'center',
  },
  navActions: { display: 'flex', gap: 10, marginLeft: 'auto', alignItems: 'center' },
  uploadBtn: {
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
    background: 'var(--red)', color: '#fff', border: 'none',
  },
  avatar: {
    width: 36, height: 36, borderRadius: '50%',
    background: '#1D9E75', color: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 13, fontWeight: 600, cursor: 'pointer', flexShrink: 0,
  },
};

export default function Navbar({ onSearch, onUpload }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo} onClick={() => onSearch('')}>
        <span style={styles.logoIcon}>▶</span> VidéoTube
      </div>

      <div style={styles.searchBar}>
        <input
          style={styles.searchInput}
          type="text"
          placeholder="Rechercher des vidéos..."
          value={query}
          onChange={handleChange}
        />
        <button style={styles.searchBtn}>🔍</button>
      </div>

      <div style={styles.navActions}>
        <button style={styles.uploadBtn} onClick={onUpload}>
          ↑ Publier
        </button>
        <div style={styles.avatar}>MO</div>
      </div>
    </nav>
  );
}
