import React, { useState } from 'react';

export default function UploadModal({ open, onClose }) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [cat, setCat] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) { alert('Veuillez saisir un titre'); return; }
    alert(`✅ Vidéo "${title}" publiée avec succès !`);
    setTitle(''); setDesc(''); setCat('');
    onClose();
  };

  if (!open) return null;

  const inputStyle = {
    width: '100%', border: '0.5px solid var(--border)',
    borderRadius: 8, padding: '10px 13px', fontSize: 14,
    background: 'var(--bg2)', color: 'var(--text)',
    outline: 'none', fontFamily: 'inherit',
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)',
        zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: 'var(--bg)', borderRadius: 16, padding: 28,
        width: 480, maxWidth: '94vw', border: '0.5px solid var(--border)',
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 20 }}>Publier une vidéo</h2>

        {/* Upload zone */}
        <div
          onClick={() => alert('Sélection de fichier — à connecter avec un vrai backend')}
          style={{
            border: '1.5px dashed var(--border)', borderRadius: 12,
            padding: '36px 20px', textAlign: 'center',
            color: 'var(--text2)', marginBottom: 18, cursor: 'pointer',
            transition: 'border-color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#FF0033'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
        >
          <div style={{ fontSize: 40, marginBottom: 10 }}>☁️</div>
          <p style={{ fontSize: 14, fontWeight: 500 }}>Glissez votre vidéo ici ou cliquez pour parcourir</p>
          <p style={{ fontSize: 12, marginTop: 6, opacity: 0.7 }}>MP4, MOV, AVI · max 4 Go</p>
        </div>

        {/* Form fields */}
        {[
          { label: 'Titre *', value: title, setter: setTitle, placeholder: 'Donnez un titre accrocheur...', multi: false },
          { label: 'Description', value: desc, setter: setDesc, placeholder: 'Décrivez votre vidéo...', multi: true },
          { label: 'Catégorie', value: cat, setter: setCat, placeholder: 'Tech, Gaming, Musique...', multi: false },
        ].map((field) => (
          <div key={field.label} style={{ marginBottom: 14 }}>
            <label style={{ display: 'block', fontSize: 13, color: 'var(--text2)', marginBottom: 6 }}>
              {field.label}
            </label>
            {field.multi ? (
              <textarea
                rows={3}
                style={{ ...inputStyle, resize: 'none' }}
                placeholder={field.placeholder}
                value={field.value}
                onChange={e => field.setter(e.target.value)}
              />
            ) : (
              <input
                style={inputStyle}
                type="text"
                placeholder={field.placeholder}
                value={field.value}
                onChange={e => field.setter(e.target.value)}
              />
            )}
          </div>
        ))}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <button
            onClick={onClose}
            style={{
              padding: '9px 20px', borderRadius: 999,
              border: '0.5px solid var(--border)', background: 'none',
              color: 'var(--text)', fontSize: 14, cursor: 'pointer',
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '9px 22px', borderRadius: 999,
              background: '#FF0033', color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
            }}
          >
            Publier ↗
          </button>
        </div>
      </div>
    </div>
  );
}
