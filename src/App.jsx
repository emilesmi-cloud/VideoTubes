import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import VideoCard from './components/VideoCard';
import VideoPlayer from './components/VideoPlayer';
import UploadModal from './components/UploadModal';
import { createClient } from '@supabase/supabase-js';
import { CATEGORIES } from './data';

const supabase = createClient(
  'https://hrwnqheunpypsygvhsky.supabase.co',
  'sb_publishable_Vry3JeJHenwyYp3vBD3zhw_PG-0gFye'
);

export default function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [activeChip, setActiveChip] = useState('Tout');
  const [activeTab, setActiveTab] = useState('Accueil');
  const [currentVideo, setCurrentVideo] = useState(null);
  const [uploadOpen, setUploadOpen] = useState(false);

  useEffect(() => { fetchVideos(); }, []);

  const fetchVideos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('videos')
      .select('*');
    if (!error) setVideos(data || []);
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return videos.filter(v => {
      const matchCat = activeChip === 'Tout' || v.cat === activeChip;
      const matchQ = !query || v.title?.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchQ;
    });
  }, [query, activeChip, videos]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onSearch={(q) => { setQuery(q); setCurrentVideo(null); }} onUpload={() => setUploadOpen(true)} />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar activeTab={activeTab} onTab={(tab) => { setActiveTab(tab); setCurrentVideo(null); }} />
        <main style={{ flex: 1, padding: 20 }}>
          {currentVideo ? (
            <VideoPlayer video={currentVideo} onBack={() => setCurrentVideo(null)} />
          ) : (
            <>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {CATEGORIES.map((cat) => (
                  <button key={cat} onClick={() => setActiveChip(cat)} style={{
                    padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 500,
                    border: '0.5px solid var(--border)', cursor: 'pointer',
                    background: activeChip === cat ? 'var(--text)' : 'var(--bg)',
                    color: activeChip === cat ? 'var(--bg)' : 'var(--text)',
                  }}>{cat}</button>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
                  <p style={{ fontSize: 20 }}>⏳ Chargement...</p>
                </div>
              ) : filtered.length > 0 ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                  {filtered.map((video) => (
                    <VideoCard key={video.id} video={video} onClick={setCurrentVideo} />
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text2)' }}>
                  <p style={{ fontSize: 20 }}>🎬 Aucune vidéo trouvée</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} onSuccess={fetchVideos} />
    </div>
  );
}