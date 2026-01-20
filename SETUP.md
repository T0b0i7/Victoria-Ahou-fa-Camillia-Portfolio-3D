# Portfolio 3D de Victoria Ahouéfa Camillia

Un portfolio 3D moderne et interactif construit avec React, TypeScript, Three.js et Tailwind CSS.

## 🚀 Démarrage Rapide

### Prérequis
- Node.js >= 14
- npm ou yarn

### Installation

1. Clonez le dépôt
```bash
git clone <repository-url>
cd Victoria-3d-portfolio
```

2. Installez les dépendances
```bash
npm install
```

3. Configurez les variables d'environnement
```bash
cp .env.example .env.local
```

### Configuration EmailJS

1. Créez un compte sur [emailjs.com](https://www.emailjs.com)
2. Créez un service (Gmail, Outlook, etc.)
3. Créez un template avec les variables:
   - `to_name`
   - `from_email`
   - `message`
   - `form_name`

4. Mettez à jour votre fichier `.env.local`:
```env
VITE_EMAILJS_SERVICE_ID=votre_service_id
VITE_EMAILJS_TEMPLATE_ID=votre_template_id
VITE_EMAILJS_ACCESS_TOKEN=votre_public_key
```

### Démarrage du Serveur de Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:5173`

### Build pour Production

```bash
npm run build
```

## 📋 Fonctionnalités

- ✨ Design 3D interactif avec Three.js
- 📱 Responsive et Mobile-friendly
- 🎨 Animations fluides avec Framer Motion
- 📧 Formulaire de contact intégré avec EmailJS
- 🗺️ Carte Google Maps intégrée
- 🌙 Mode sombre
- ⚡ Performance optimisée

## 📂 Structure du Projet

```
src/
├── components/
│   ├── atoms/
│   ├── canvas/
│   ├── layout/
│   └── sections/
├── constants/
├── hoc/
├── types/
├── utils/
└── assets/
```

## 🛠️ Technologies Utilisées

- **Frontend**: React, TypeScript
- **3D**: Three.js, React Three Fiber, Drei
- **Animations**: Framer Motion
- **Styles**: Tailwind CSS
- **Build**: Vite
- **Email**: EmailJS

## 📞 Informations de Contact

- 📧 Email: dalmeidavictoria05@gmail.com
- 📱 Téléphone: +2290157408841
- 📍 Localisation: Abomey-Calavi, Bénin

## 📄 Licence

Ce projet est sous la licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
