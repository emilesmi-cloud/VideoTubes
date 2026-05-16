import React from 'react';

const items = [
  { icon: '🏠', label: 'Accueil' },
  { icon: '▶', label: 'Shorts' },
  { icon: '👥', label: 'Abonnements' },
];
const myItems = [
  { icon: '🕐', label: 'Historique' },
  { icon: '📋', label: 'Playlists' },
  { icon: '🎬', label: 'Vos vidéos' },
  { icon: '❤️', label: 'Vidéos aimées' },
];
const exploreItems = [
  { icon: '📈', label: 'Tendances' },
  { icon: '🎵', label: 'Musique' },
  { icon: '⚽', label: 'Sport' },
  { icon: '🎮', label: 'Gaming' },
  { icon: '💻', label: 'Tech' },
];

const s = {
  sidebar: {
    width: 220, flexShrink: 0, background: 'var(--bg)',
    borderRight: '0.5px solid var(--border)', padding: '12px 0',
    overflowY: 'auto',
  },
  sectionTitle: {
    fontSize: 11, fontWeight: 600, color: 'var(--text2)',
    padding: '8px 20px 4px', textTransform: 'uppercase', letterSpacing: '0.07em',
  },
  item: (active) => ({
    display: 'flex', alignItems: 'center', gap: 14,
    padding: '10px 20px', cursor: 'pointer', fontSize: 14,
    color: active ? 'var(--text)' : 'var(--text)',
    background: active ? 'var(--bg3)' : 'transparent',
    fontWeight: active ? 600 : 400,
    transition: 'background 0.12s',
  }),
  divider: { height: '0.5px', background: 'var(--border)', margin: '10px 20px' },
};

export default function Sidebar({ activeTab, onTab }) {
  const renderItems = (list) =>
    list.map((it) => (
      <div
        key={it.label}
        style={s.item(activeTab === it.label)}
        onClick={() => onTab(it.label)}
        onMouseEnter={e => { if (activeTab !== it.label) e.currentTarget.style.background = 'var(--bg2)'; }}
        onMouseLeave={e => { if (activeTab !== it.label) e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{ fontSize: 18 }}>{it.icon}</span> {it.label}
      </div>
    ));

  return (
    <aside style={s.sidebar}>
      {renderItems(items)}
      <div style={s.divider} />
      <div style={s.sectionTitle}>Vous</div>
      {renderItems(myItems)}
      <div style={s.divider} />
      <div style={s.sectionTitle}>Explorer</div>
      {renderItems(exploreItems)}
    </aside>
  );
}
