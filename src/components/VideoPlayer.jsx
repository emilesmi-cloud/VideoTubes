import React, { useState } from 'react';

function PlayerThumbnail({ video }) {
  return (
    <svg viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id={`pg${video.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={video.color1} />
          <stop offset="100%" stopColor={video.color2} />
        </linearGradient>
      </defs>
      <rect width="640" height="360" fill={`url(#pg${video.id})`} />
      <text x="320" y="200" textAnchor="middle" fontSize="80" fill="rgba(255,255,255,0.15)" fontFamily="sans-serif">▶</text>
    </svg>
  );
}

export default function VideoPlayer({ video, onBack }) {
  const [playing, setPlaying] = useState(true);
  const [liked, setLiked] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [progress, setProgress] = useState(34);

  const handleProgressClick = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    setProgress(Math.round(pct));
  };

  return (
    <div>
      {/* Back button */}
      <div
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '0 0 16px', cursor: 'pointer', color: 'var(--text2)',
          fontSize: 14, width: 'fit-content',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
      >
        ← Retour
      </div>

      {/* Player */}
      <div style={{
        background: '#000', borderRadius: 12,
        aspectRatio: '16/9', position: 'relative', overflow: 'hidden', marginBottom: 16,
      }}>
        <PlayerThumbnail video={video} />

        {/* Controls overlay */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '32px 16px 12px',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
        }}>
          {/* Progress bar */}
          <div
            onClick={handleProgressClick}
            style={{
              height: 4, background: 'rgba(255,255,255,0.3)',
              borderRadius: 2, marginBottom: 12, cursor: 'pointer', position: 'relative',
            }}
          >
            <div style={{
              height: '100%', background: '#FF0033',
              borderRadius: 2, width: `${progress}%`, position: 'relative',
            }}>
              <div style={{
                width: 13, height: 13, background: '#fff', borderRadius: '50%',
                position: 'absolute', right: -6, top: -4.5,
              }} />
            </div>
          </div>

          {/* Control row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <button
              onClick={() => setPlaying(!playing)}
              style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer' }}
            >
              {playing ? '⏸' : '▶'}
            </button>
            <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>🔊</button>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: 13, marginRight: 'auto' }}>
              {Math.floor(progress / 100 * 18)}:42 / {video.duration}
            </span>
            <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>⚙️</button>
            <button style={{ background: 'none', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>⛶</button>
          </div>
        </div>
      </div>

      {/* Title */}
      <h1 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, lineHeight: 1.4 }}>{video.title}</h1>

      {/* Channel row */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 0', borderTop: '0.5px solid var(--border)',
        borderBottom: '0.5px solid var(--border)', marginBottom: 12,
      }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%',
          background: video.avatarBg, color: video.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 14, fontWeight: 600,
        }}>
          {video.avatar}
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{video.channel}</div>
          <div style={{ fontSize: 12, color: 'var(--text2)' }}>{video.views} abonnés</div>
        </div>
        <button
          onClick={() => setSubscribed(!subscribed)}
          style={{
            marginLeft: 'auto', padding: '9px 20px', borderRadius: 999,
            background: subscribed ? 'var(--bg3)' : 'var(--text)',
            color: subscribed ? 'var(--text)' : 'var(--bg)',
            border: 'none', fontWeight: 600, fontSize: 13, cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          {subscribed ? '✓ Abonné' : "S'abonner"}
        </button>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
        {[
          { icon: liked ? '❤️' : '🤍', label: liked ? 'Aimé' : "J'aime", action: () => setLiked(!liked), active: liked },
          { icon: '↗', label: 'Partager', action: () => alert('Lien copié !') },
          { icon: '🔖', label: 'Enregistrer', action: () => alert('Enregistré dans vos playlists') },
          { icon: '⋯', label: 'Plus', action: () => {} },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '9px 16px', borderRadius: 999,
              background: btn.active ? '#FF0033' : 'var(--bg2)',
              color: btn.active ? '#fff' : 'var(--text)',
              border: '0.5px solid var(--border)',
              fontSize: 13, fontWeight: 500, cursor: 'pointer',
            }}
          >
            {btn.icon} {btn.label}
          </button>
        ))}
      </div>

      {/* Description */}
      <div style={{
        background: 'var(--bg2)', borderRadius: 12,
        padding: '14px 16px', fontSize: 14, lineHeight: 1.7, color: 'var(--text2)',
      }}>
        <div style={{ fontWeight: 600, color: 'var(--text)', marginBottom: 6, fontSize: 13 }}>
          {video.views} vues · {video.time}
        </div>
        {video.description}
        <div style={{ marginTop: 10, color: 'var(--red)', fontSize: 13 }}>
          #{video.cat} #VidéoTube #Madagascar
        </div>
      </div>
    </div>
  );
}
