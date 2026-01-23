import type {
  TNavLink,
  TService,
  TTechnology,
  TExperience,
  TProject,
  TCertification,
  TSkillCategory,
} from "../types";

import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  tesla,
  innovetech,
  sicoges,
  threejs,
} from "../assets";

export const navLinks: TNavLink[] = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "skills",
    title: "Compétences",
  },
  {
    id: "certifications",
    title: "Certifications",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services: TService[] = [
  {
    title: "Développeuse Full-stack",
    icon: web,
  },
  {
    title: "IA & Data Science",
    icon: mobile,
  },
  {
    title: "Spécialiste Cybersécurité",
    icon: backend,
  },
  {
    title: "IoT & Systèmes Embarqués",
    icon: creator,
  },
];

const technologies: TTechnology[] = [
  {
    name: "Python",
    icon: javascript,
  },
  {
    name: "Java",
    icon: typescript,
  },
  {
    name: "Django",
    icon: reactjs,
  },
  {
    name: "React JS",
    icon: redux,
  },
  {
    name: "Next.js",
    icon: tailwind,
  },
  {
    name: "Bootstrap",
    icon: nodejs,
  },
  {
    name: "MySQL",
    icon: mongodb,
  },
  {
    name: "SQLite",
    icon: threejs,
  },
  {
    name: "Git/GitHub",
    icon: git,
  },
  {
    name: "Arduino",
    icon: figma,
  },
  {
    name: "IoT",
    icon: docker,
  },
  {
    name: "Apprentissage Automatique",
    icon: html,
  },
];

const experiences: TExperience[] = [
  {
    title: "Développeuse Full-stack",
    companyName: "InnovTech",
    icon: innovetech,
    iconBg: "#383E56",
    date: "Nov 2025 - Présent",
    points: [
      "Développement et maintenance d'applications web Full-stack avec les technologies modernes.",
      "Collaboration avec des équipes multidisciplinaires pour concevoir et implémenter des solutions évolutives.",
      "Implémentation de design responsive et optimisation des performances.",
      "Participation à des reviews de code et feedback constructif.",
    ],
  },
  {
    title: "Stagiaire Développeuse Backend",
    companyName: "Art-Creativity",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Mars 2025 - Juin 2025",
    points: [
      "Développement de systèmes backend avec Django et architecture RESTful.",
      "Implémentation de systèmes de collecte et synchronisation de données de santé.",
      "Obtention de la mention Excellente pour la qualité technique et l'impact social.",
      "Travail avec bases de données MySQL et solutions de gestion de données.",
    ],
  },
  {
    title: "Stagiaire - Développement Web",
    companyName: "Sicogès",
    icon: sicoges,
    iconBg: "#383E56",
    date: "Juil 2023 - Août 2023",
    points: [
      "Formation pratique en développement web avec Django et Bootstrap.",
      "Participation à des projets réels de gestion intégrant frontend et backend.",
      "Travail avec bases de données et implémentation de design responsive.",
      "Collaboration avec les équipes sur divers aspects du développement web.",
    ],
  },
  {
    title: "Responsable de classe",
    companyName: "INSIT",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "2022 - 2025",
    points: [
      "Coordination académique et organisationnelle de la classe.",
      "Direction des initiatives en développement du leadership et communication.",
      "Promotion de l'engagement communautaire et des programmes d'égalité des genres.",
      "Progression académique constante démontrant rigueur et motivation.",
    ],
  },
];

const projects: TProject[] = [
  {
    name: "Système de Reconnaissance Faciale",
    description:
      "Système automatisé de suivi des présences en entreprise utilisant des algorithmes IA de reconnaissance d'images et collecte de données automatisée. Implémentation d'algorithmes de vision par ordinateur pour détection en temps réel.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "IA/ML",
        color: "green-text-gradient",
      },
      {
        name: "OpenCV",
        color: "pink-text-gradient",
      },
    ],
    image: "/Système de Reconnaissance Faciale.jpg",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Station Météo IoT",
    description:
      "Système IoT complet avec microcontrôleur ESP32 pour l'acquisition de données météorologiques, transmission et visualisation via interface web. Implémentation de streaming de données et suivi en temps réel.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Arduino/ESP32",
        color: "green-text-gradient",
      },
      {
        name: "Tableau de Bord Web",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Fortify - Sécurité Autonome des Parkings",
    description:
      "Application Full-stack pour la sécurité des parkings avec systèmes de véhicules autonomes. Implémente l'application automatique pour prévenir les violations routières en temps réel.",
    tags: [
      {
        name: "Django",
        color: "blue-text-gradient",
      },
      {
        name: "React",
        color: "green-text-gradient",
      },
      {
        name: "Détection IA",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Hackathon National Smart Cities - FRERAF",
    description:
      "Application mobile IA pour alertes de sécurité et détection des zones à risque. Finalistes du hackathon avec une solution innovante combinant IA et géolocalisation.",
    tags: [
      {
        name: "IA/ML",
        color: "blue-text-gradient",
      },
      {
        name: "Mobile App",
        color: "green-text-gradient",
      },
      {
        name: "Géolocalisation",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "École d'été IA (EEIA) - Voiture Autonome",
    description:
      "Prototypage de voiture autonome capable de circuler et de prendre des décisions sans intervention humaine. Projet d'amélioration de la sécurité routière combinant vision par ordinateur et systèmes embarqués.",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Systèmes Embarqués",
        color: "green-text-gradient",
      },
      {
        name: "IA/Vision",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "Hackathon CELTIIS - App Streaming Touristique",
    description:
      "Application mobile de streaming touristique développée en équipe. Utilise les compétences acquises lors des formations sur les mini-apps et technologies mobiles modernes.",
    tags: [
      {
        name: "React Native",
        color: "blue-text-gradient",
      },
      {
        name: "Streaming",
        color: "green-text-gradient",
      },
      {
        name: "Mobile",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
  {
    name: "GAIATHon'24 - Batterie pour Motos Électriques",
    description:
      "Conception d'une batterie innovante pour motos afin de remplacer l'essence, réduisant la pollution et protégeant la couche d'ozone. Concours d'innovation environnementale.",
    tags: [
      {
        name: "Électronique",
        color: "blue-text-gradient",
      },
      {
        name: "Innovation",
        color: "green-text-gradient",
      },
      {
        name: "Environnement",
        color: "pink-text-gradient",
      },
    ],
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop",
    sourceCodeLink: "https://github.com/",
  },
];

const certifications: TCertification[] = [
  {
    name: "Fondations de la Cybersécurité",
    issuer: "Coursera",
  },
  {
    name: "Connecter et Protéger les Réseaux et la Sécurité Réseau",
    issuer: "Coursera",
  },
  {
    name: "Jouer la Sécurité : Gérer les Risques de Sécurité",
    issuer: "Coursera",
  },
  {
    name: "Introduction à l'IoT et la Transformation Numérique",
    issuer: "CISCO Networking Academy",
  },
  {
    name: "Introduction à la cybersécurité",
    issuer: "CISCO Networking Academy",
  },
  {
    name: "Détection d'Objets : Du Zéro au Héros",
    issuer: "Udemy",
  },
  {
    name: "Maîtrise de Python – 100 Jours, 100 Projets",
    issuer: "Udemy",
  },
  {
    name: "Construire une Voiture Autonome via l'IA et l'IoT",
    issuer: "Udemy",
  },
  {
    name: "Fondations : Les Données, Partout les Données",
    issuer: "Coursera",
  },
  {
    name: "Fondamentaux de la Vision par Ordinateur",
    issuer: "Udemy",
  },
];

export { services, technologies, experiences, projects, certifications };

const skills: TSkillCategory[] = [
  {
    category: "Programmation",
    skills: ["Python", "Java", "HTML/CSS", "Django", "Bootstrap", "Next.js", "MySQL", "SQLite"],
    color: "#915EFF",
  },
  {
    category: "Data Science & IA",
    skills: ["Machine Learning", "Vision par Ordinateur (YOLO)", "TinyML", "Big Data", "Visualisation de données"],
    color: "#00D4FF",
  },
  {
    category: "Électronique & Systèmes Embarqués",
    skills: ["CAO Électrique", "Arduino", "Instrumentation Industrielle", "Programmation de Drones", "Voitures Autonomes", "Domotique"],
    color: "#FF6B6B",
  },
  {
    category: "Outils & Méthodes",
    skills: ["UML", "Git/GitHub", "Canva", "Gestion de Projets Numériques", "Optimisation et Analyse"],
    color: "#4ECDC4",
  },
  {
    category: "Réseaux & Cybersécurité",
    skills: ["Architecture Réseau", "Sécurité SI", "VPN", "Cryptographie", "MFA"],
    color: "#FFD93D",
  },
];

export { skills };
