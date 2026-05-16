# VidéoTube 🎬

Plateforme vidéo complète construite avec React, prête à déployer sur Vercel.

---

## 🚀 Mettre en ligne en 5 étapes (DÉBUTANT)

### Étape 1 — Installer les outils (1 seule fois)

Télécharge et installe ces 2 outils gratuits :

1. **Node.js** → https://nodejs.org (clique sur "LTS", puis installe)
2. **Git** → https://git-scm.com (clique sur "Download for Windows/Mac")

---

### Étape 2 — Créer un compte GitHub (gratuit)

1. Va sur https://github.com
2. Clique "Sign up" et crée ton compte
3. Vérifie ton email

---

### Étape 3 — Mettre ton code sur GitHub

Ouvre le terminal (sur Windows : cherche "cmd" ou "PowerShell") :

```bash
# Va dans le dossier du projet
cd videotube

# Installe les dépendances
npm install

# Teste en local (tu verras le site sur http://localhost:3000)
npm start
```

Ensuite sur GitHub :
1. Crée un nouveau repository nommé `videotube`
2. Dans le terminal :

```bash
git init
git add .
git commit -m "Premier commit - VidéoTube"
git branch -M main
git remote add origin https://github.com/TON_NOM/videotube.git
git push -u origin main
```

---

### Étape 4 — Déployer sur Vercel (gratuit)

1. Va sur https://vercel.com
2. Clique "Sign Up" → "Continue with GitHub"
3. Clique "New Project"
4. Sélectionne ton repository `videotube`
5. Clique "Deploy" → attends 2 minutes ☕

✅ Ton site est en ligne ! Vercel te donne une URL comme `videotube.vercel.app`

---

### Étape 5 — Domaine personnalisé (optionnel, ~10$/an)

1. Achète un domaine sur https://namecheap.com (ex: `madavideo.mg`)
2. Dans Vercel → Settings → Domains → ajoute ton domaine
3. Suis les instructions DNS de Vercel

---

## 📁 Structure du projet

```
videotube/
├── public/
│   └── index.html          ← Page HTML principale
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      ← Barre de navigation
│   │   ├── Sidebar.jsx     ← Menu latéral
│   │   ├── VideoCard.jsx   ← Carte vidéo
│   │   ├── VideoPlayer.jsx ← Lecteur vidéo
│   │   └── UploadModal.jsx ← Modal d'upload
│   ├── App.jsx             ← Composant principal
│   ├── data.js             ← Données des vidéos
│   ├── index.js            ← Point d'entrée React
│   └── index.css           ← Styles globaux
├── package.json            ← Dépendances
├── vercel.json             ← Config Vercel
└── README.md               ← Ce fichier
```

---

## 🔧 Personnaliser le site

### Changer le nom du site
Dans `src/components/Navbar.jsx`, ligne 47 :
```jsx
VidéoTube  ← Change ici
```

### Ajouter de vraies vidéos
Dans `src/data.js`, ajoute un objet dans le tableau `VIDEOS` :
```js
{
  id: 9,
  title: "Ma nouvelle vidéo",
  channel: "Ma Chaîne",
  views: "1K",
  time: "aujourd'hui",
  duration: "5:30",
  cat: "Tech",
  // ...
}
```

### Changer la couleur principale
Dans `src/index.css`, ligne 4 :
```css
--red: #FF0033;  ← Change cette couleur
```

---

## 🛠 Prochaines étapes pour un vrai backend

| Fonctionnalité | Outil recommandé | Prix |
|---|---|---|
| Base de données | Supabase | Gratuit |
| Authentification | Supabase Auth | Gratuit |
| Hébergement vidéos | Bunny.net | ~$1/100GB |
| Domaine .mg | Namecheap | ~$15/an |

---

## 📞 Besoin d'aide ?

Demande à Claude sur claude.ai — il peut t'aider à chaque étape !
