# SupplyChainBot CI

**NexaBridge Solutions** — Intelligence Supply Chain pour la Côte d'Ivoire

SupplyChainBot CI est un assistant IA spécialisé en logistique, commerce extérieur et opérations portuaires pour la Côte d'Ivoire. Il couvre le GUCE, le Port d'Abidjan, les Incoterms 2020, les tarifs douaniers, et le calcul de surestaries.

---

## Fonctionnalités

- **Mode Formation** — Apprentissage guidé sur les procédures douanières, Incoterms, GUCE
- **Mode Veille** — Recherche web en temps réel avec sources citées (Port d'Abidjan, fret, réglementation)
- **Mode Calcul** — Calcul de surestaries, droits de douane, coûts logistiques
- **Tableau de bord** — KPIs portuaires, actions rapides pré-configurées
- **Authentification** — Connexion sécurisée via Google (Firebase Auth)
- **Streaming** — Réponses en temps réel avec rendu Markdown

## Stack technique

- React 18 + Vite
- Tailwind CSS v4
- Firebase (Auth + Firestore)
- Anthropic Claude (`claude-sonnet-4-20250514`) avec tool use `web_search`
- React Router DOM v6
- React Markdown

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/Edmondjr/supplychainbot-ci.git
cd supplychainbot-ci
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

```bash
cp .env.example .env
```

Renseignez votre `.env` :

| Variable | Description |
|---|---|
| `VITE_ANTHROPIC_API_KEY` | Clé API Anthropic (console.anthropic.com) |
| `VITE_FIREBASE_API_KEY` | Clé API Firebase |
| `VITE_FIREBASE_AUTH_DOMAIN` | Domaine d'authentification Firebase |
| `VITE_FIREBASE_PROJECT_ID` | ID du projet Firebase |
| `VITE_FIREBASE_STORAGE_BUCKET` | Bucket de stockage Firebase |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ID expéditeur Firebase |
| `VITE_FIREBASE_APP_ID` | ID de l'application Firebase |

### 4. Configuration Firebase

1. Créez un projet sur [Firebase Console](https://console.firebase.google.com)
2. Activez **Authentication** → Google
3. Ajoutez `localhost` aux domaines autorisés
4. Copiez la configuration dans votre `.env`

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:5173](http://localhost:5173)

---

## Structure du projet

```
src/
├── components/
│   ├── chat/          # ChatWindow, MessageBubble, SourceCard, TypingIndicator
│   ├── dashboard/     # KPIWidget, QuickActionCard
│   └── layout/        # Navbar, Sidebar
├── context/           # AuthContext
├── hooks/             # useChat, useAuth
├── pages/             # Dashboard, ChatPage, Login
└── services/          # claudeApi.js, firebase.js, sourceParser.js
```

---

## Build de production

```bash
npm run build
npm run preview
```

---

*NexaBridge Solutions — Votre partenaire en intelligence supply chain pour l'Afrique de l'Ouest.*
