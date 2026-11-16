export type TechnologyStatus = 'mastered' | 'project' | 'learning';

export interface Technology {
  name: string;
  icon: string;
  level?: TechnologyStatus;
}

export interface TechnologyGroup {
  category: string;
  items: Technology[];
}

export interface Project {
  name: string;
  type: string;
  category: 'web' | 'fullstack';
  description: string;
  context: string;
  contribution: string;
  focus: string[];
  technologies: string[];
  image?: string;
  url?: string;
  repository?: string;
  visual: 'terra' | 'patrimoine' | 'prestalink' | 'campusroom' | 'storemanager';
}

export const technologyGroups: TechnologyGroup[] = [
  {
    category: 'Front-end',
    items: [
      { name: 'HTML5', icon: 'html5', level: 'mastered' },
      { name: 'CSS3', icon: 'css3', level: 'mastered' },
      { name: 'JavaScript', icon: 'javascript', level: 'mastered' },
      { name: 'TypeScript', icon: 'typescript', level: 'project' },
      { name: 'Vue.js', icon: 'vuejs', level: 'project' },
      { name: 'React', icon: 'react', level: 'learning' },
    ],
  },
  {
    category: 'Back-end',
    items: [
      { name: 'PHP', icon: 'php', level: 'mastered' },
      { name: 'Laravel', icon: 'laravel', level: 'mastered' },
      { name: 'Node.js', icon: 'nodejs', level: 'project' },
      { name: 'Express.js', icon: 'expressjs', level: 'project' },
    ],
  },
  {
    category: 'Bases de données',
    items: [
      { name: 'MySQL', icon: 'mysql', level: 'mastered' },
      { name: 'PostgreSQL', icon: 'postgresql', level: 'project' },
      { name: 'Sequelize', icon: 'sequelize', level: 'project' },
      { name: 'Prisma', icon: 'prisma', level: 'learning' },
    ],
  },
  {
    category: 'Outils & environnements',
    items: [
      { name: 'Git', icon: 'git', level: 'mastered' },
      { name: 'GitHub', icon: 'github', level: 'mastered' },
      { name: 'GitLab', icon: 'gitlab', level: 'project' },
      { name: 'Docker', icon: 'docker', level: 'project' },
      { name: 'Visual Studio Code', icon: 'vscode', level: 'mastered' },
      { name: 'Linux', icon: 'linux', level: 'project' },
      { name: 'Postman', icon: 'postman', level: 'project' },
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'CampusRoom', type: 'Application de réservation', category: 'fullstack', visual: 'campusroom',
    description: 'Application de gestion des réservations de salles universitaires, pensée pour organiser l’usage des espaces de manière claire et fiable.',
    context: 'Le projet porte sur la gestion des salles universitaires et de leurs réservations.',
    contribution: 'Développement d’une application de gestion des salles, des utilisateurs, des rôles et des réservations.',
    focus: ['Gestion des salles', 'Gestion des utilisateurs et des rôles', 'Gestion des réservations'],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Git'],
    repository: 'https://gitlab.com/badjiassane00-cmd/campusroom',
  },
  {
    name: 'StoreManager Pro', type: 'ERP de gestion', category: 'fullstack', visual: 'storemanager',
    description: 'Application de gestion commerciale et de stock pour suivre les produits, les mouvements et les besoins du quotidien.',
    context: 'Le projet répond aux besoins de gestion commerciale d’un magasin.',
    contribution: 'Conception d’une application de gestion de magasin, avec un accent sur les produits et les stocks.',
    focus: ['Gestion des produits', 'Gestion des stocks'],
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'GitHub'],
    repository: 'https://github.com/badjiassane00-cmd/StoreManager-Pro',
  },
  {
    name: 'TERRA Web', type: 'Projet web', category: 'web', visual: 'terra', image: '/assets/projects/terra.webp',
    description: 'Plateforme web de sensibilisation et de partage autour de la biodiversité, avec une logique de centralisation des informations.',
    context: 'Le projet centralise et partage des informations sur la biodiversité, les écosystèmes et les observations.',
    contribution: 'Développement d’une plateforme web dédiée à la biodiversité, avec des fonctionnalités liées aux écosystèmes et aux observations.',
    focus: ['Centralisation des informations', 'Écosystèmes', 'Observations', 'Partage'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    url: 'https://terra-web-avn6.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/TERRA',
  },
  {
    name: 'Patrimoine', type: 'Projet web', category: 'web', visual: 'patrimoine', image: '/assets/projects/patrimoine.webp',
    description: 'Plateforme web dédiée à la gestion et à la valorisation de contenus patrimoniaux.',
    context: 'Le projet consiste à concevoir et développer une plateforme web dédiée à la gestion du patrimoine.',
    contribution: 'Participation à la conception et au développement de la plateforme.',
    focus: ['Gestion du patrimoine', 'Conception et développement d’une plateforme web'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    url: 'https://patrimoine-5o5f.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/patrimoine',
  },
  {
    name: 'PrestaLink', type: 'Mise en relation', category: 'web', visual: 'prestalink', image: '/assets/projects/find.webp',
    description: 'Plateforme de mise en relation entre particuliers et prestataires certifiés au Sénégal.',
    context: 'La plateforme aide les personnes à trouver des artisans et prestataires certifiés.',
    contribution: 'Conception d’une expérience web pour rechercher et découvrir des prestataires au Sénégal.',
    focus: ['Mise en relation', 'Artisans et prestataires', 'Service destiné au Sénégal'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Laravel', 'MySQL'],
    url: 'https://find-3nmq.onrender.com/',
  },
];
