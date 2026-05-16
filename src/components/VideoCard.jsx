import React from 'react';

function Thumbnail({ video }) {
  return (
    <svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', display: 'block' }}>
      <defs>
        <linearGradient id={`g${video.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={video.color1} />
          <stop offset="100%" stopColor={video.color2} />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill={`url(#g${video.id})`} />
      <text x="160" y="100" textAnchor="middle" fontSize="56" fill="rgba(255,255,255,0.2)" fontFamily="sans-serif">▶</text>
      <text x="14" y="168" fontSize="12" fill="rgba(255,255,255,0.8)" fontFamily="sans-serif" fontWeight="500">{video.channel}</text>
    </svg>
  );
}

export default function VideoCard({ video, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(video)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative', borderRadius: 12, overflow: 'hidden',
        aspectRatio: '16/9', background: 'var(--bg2)', marginBottom: 10,
      }}>
        <Thumbnail video={video} />

        {/* Hover overlay */}
        <div style={{
          position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: hovered ? 1 : 0, transition: 'opacity 0.18s',
        }}>
          <span style={{ fontSize: 52, color: '#fff' }}>▶</span>
        </div>

        {/* Duration badge */}
        <div style={{
          position: 'absolute', bottom: 6, right: 8,
          background: 'rgba(0,0,0,0.82)', color: '#fff',
          fontSize: 11, fontWeight: 600, padding: '2px 6px', borderRadius: 4,
        }}>
          {video.duration}
        </div>
      </div>

      {/* Card info */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0, marginTop: 2,
          background: video.avatarBg, color: video.avatarColor,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 600,
        }}>
          {video.avatar}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontSize: 14, fontWeight: 500, lineHeight: 1.4, marginBottom: 4,
            color: 'var(--text)',
            display: '-webkit-box', WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {video.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 2 }}>{video.channel}</div>
          <div style={{ fontSize: 12, color: 'var(--text2)' }}>{video.views} vues · {video.time}</div>
        </div>
      </div>
    </div>
  );
}
