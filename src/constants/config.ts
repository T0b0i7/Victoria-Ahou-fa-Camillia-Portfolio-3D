type TSection = {
  p: string;
  h2: string;
  content?: string;
};

type TConfig = {
  html: {
    title: string;
    fullName: string;
    email: string;
  };
  contact_info: {
    phone: string;
    location: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    linkedin: string;
    profileImage: string;
  };
  hero: {
    name: string;
    p: string[];
  };
  contact: {
    form: {
      name: {
        span: string;
        placeholder: string;
      };
      email: {
        span: string;
        placeholder: string;
      };
      message: {
        span: string;
        placeholder: string;
      };
    };
  } & TSection;
  sections: {
    about: Required<TSection>;
    experience: TSection;
    feedbacks: TSection;
    works: Required<TSection>;
  };
};

export const config: TConfig = {
  html: {
    title: "Victoria Ahouéfa Camillia — Portfolio 3D",
    fullName: "D'ALMEIDA Victoria Ahouéfa Camillia",
    email: "dalmeidavictoria05@gmail.com",
  },
  contact_info: {
    phone: "+2290157408841",
    location: "Abomey-Calavi, Bénin",
    coordinates: {
      lat: 6.4969,
      lng: 2.3522,
    },
    linkedin: "https://www.linkedin.com/in/victoria-d-almeida-7a920b26b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    profileImage: "/profil.png",
  },
  hero: {
    name: "Victoria Ahouéfa",
    p: ["Je crée des solutions Full-stack,", "des systèmes IA et des applications sécurisées"],
  },
  contact: {
    p: "Restons en contact",
    h2: "Contact.",
    form: {
      name: {
        span: "Votre Nom",
        placeholder: "Quel est votre nom?",
      },
      email: { span: "Votre Email", placeholder: "Quel est votre email?" },
      message: {
        span: "Votre Message",
        placeholder: "Que voulez-vous dire?",
      },
    },
  },
  sections: {
    about: {
      p: "Introduction",
      h2: "Aperçu.",
      content: `Diplômée en Génie Électrique et Informatique, je suis une développeuse Full-stack spécialisée en IA, cybersécurité et IoT. Je me concentre sur la création de solutions robustes et évolutives pour la sécurité et les systèmes intelligents. Je collabore étroitement avec les équipes pour développer des applications efficaces et j'adore relever les défis en apprentissage automatique, développement backend et systèmes embarqués.`,
    },
    experience: {
      p: "Ce que j'ai réalisé",
      h2: "Expérience Professionnelle.",
    },
    feedbacks: {
      p: "Ce que les autres disent",
      h2: "Recommandations.",
    },
    works: {
      p: "Mes travaux",
      h2: "Projets.",
      content: `Les projets suivants mettent en évidence mes compétences et mon expérience à travers des exemples concrets de mon travail. Chaque projet est brièvement décrit avec des liens vers les dépôts de code. Cela reflète ma capacité à résoudre des problèmes complexes en IA, cybersécurité, IoT et développement Full-stack.`,
    },
  },
};
