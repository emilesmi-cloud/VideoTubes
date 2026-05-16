import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import UploadModal from './components/UploadModal';
import { VIDEOS, CATEGORIES } from './data';

export default function App() {
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('Tout');
  const [activeTab, setActiveTab] = useState('Accueil');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  const filtered = useMemo(() => {
    return VIDEOS.filter(v => {
      const matchCat = activeChip === 'Tout' || v.cat === activeChip;
      const matchQ = !query || v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.channel.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, activeChip]);

  const handleSearch = (q) => {
    setQuery(q);
    setCurrentVideo(null);
  };

  const handleTab = (tab) => {
    setActiveTab(tab);
    setCurrentVideo(null);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSearch={handleSearch} onUpload={() => setUploadOpen(true)} />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} onTab={handleTab} />

        <main style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
          {currentVideo ? (
            <VideoPlayer video={currentVideo} onBack={() => setCurrentVideo(null)} />
          ) : (
            <>
              {/* Category chips */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveChip(cat)}
                    style={{
                      padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                      border: '0.5px solid var(--border)', cursor: 'pointer',
                      background: activeChip === cat ? 'var(--text)' : 'var(--bg)',
                      color: activeChip === cat ? 'var(--bg)' : 'var(--text)',
                      transition: 'all 0.12s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Video grid */}
              {filtered.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 20,
                }}>
                  {filtered.map((video) => (
                    <VideoCard key={video.id} video={video} onClick={setCurrentVideo} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
                  <p style={{ fontSize: 16 }}>Aucune vidéo trouvée pour <strong>"{query || activeChip}"</strong></p>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </div>
  );
}
