export interface Technology {
  name: string;
  icon: string;
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
  { category: 'Front-end', items: [{ name: 'HTML', icon: 'html5' }, { name: 'CSS', icon: 'css3' }, { name: 'JavaScript', icon: 'javascript' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'Vue.js', icon: 'vuejs' }, { name: 'React', icon: 'react' }] },
  { category: 'Back-end', items: [{ name: 'PHP', icon: 'php' }, { name: 'Laravel', icon: 'laravel' }, { name: 'Node.js', icon: 'nodejs' }, { name: 'Express.js', icon: 'expressjs' }] },
  { category: 'Données & stockage', items: [{ name: 'MySQL', icon: 'mysql' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Sequelize', icon: 'sequelize' }, { name: 'Prisma', icon: 'prisma' }] },
  { category: 'Outils & environnements', items: [{ name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'GitLab', icon: 'gitlab' }, { name: 'Docker', icon: 'docker' }, { name: 'Visual Studio Code', icon: 'vscode' }, { name: 'Postman', icon: 'postman' }] },
];

export const projects: Project[] = [
  {
    name: 'CampusRoom', type: 'Application de réservation', category: 'fullstack', visual: 'campusroom',
    description: 'Un outil centralisé pour consulter les salles universitaires et gérer leurs réservations.',
    context: 'Les demandes de réservation par e-mail créent des doublons et ne permettent pas de vérifier simplement la disponibilité. CampusRoom centralise le catalogue des salles et les réservations.',
    contribution: 'Développement d’une application de gestion des salles, des utilisateurs, des rôles et des réservations.',
    focus: ['Catalogue des salles', 'Détection des conflits horaires', 'Interface web et API JSON', 'Médias privés des salles'],
    technologies: ['PHP', 'Laravel', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'GitLab CI/CD'],
    repository: 'https://gitlab.com/badjiassane00-cmd/campusroom',
  },
  {
    name: 'StoreManager Pro', type: 'ERP de gestion', category: 'fullstack', visual: 'storemanager',
    description: 'Un projet ERP en PHP orienté gestion commerciale et modélisation des données.',
    context: 'Le projet organise les objets d’un système de gestion autour des utilisateurs, produits, clients, fournisseurs, commandes, dettes et bons de livraison.',
    contribution: 'Conception d’une application de gestion de magasin, avec un accent sur les produits et les stocks.',
    focus: ['Gestion des produits', 'Clients et fournisseurs', 'Commandes et ventes', 'Dettes et livraisons'],
    technologies: ['PHP', 'Programmation orientée objet', 'PostgreSQL', 'SQLite'],
    repository: 'https://github.com/badjiassane00-cmd/StoreManager-Pro',
  },
  {
    name: 'TERRA Web', type: 'Projet web', category: 'web', visual: 'terra', image: '/assets/projects/terra.webp',
    description: 'Une plateforme web pour centraliser et partager des informations sur la biodiversité.',
    context: 'Les informations sur les écosystèmes et les observations de biodiversité gagnent à être rassemblées dans un espace commun et partageable.',
    contribution: 'Développement d’une plateforme web dédiée à la biodiversité, avec des fonctionnalités liées aux écosystèmes et aux observations.',
    focus: ['Centralisation des informations', 'Écosystèmes', 'Observations', 'Partage des données'],
    technologies: [],
    url: 'https://terra-web-avn6.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/TERRA',
  },
  {
    name: 'Patrimoine', type: 'Projet web', category: 'web', visual: 'patrimoine', image: '/assets/projects/patrimoine.webp',
    description: 'Une plateforme web dédiée à la gestion du patrimoine.',
    context: 'Le projet porte sur la conception d’un espace web consacré à la gestion du patrimoine.',
    contribution: 'Participation à la conception et au développement de la plateforme.',
    focus: ['Gestion du patrimoine', 'Conception de plateforme', 'Développement web'],
    technologies: [],
    url: 'https://patrimoine-5o5f.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/patrimoine',
  },
  {
    name: 'PrestaLink', type: 'Mise en relation', category: 'web', visual: 'prestalink', image: '/assets/projects/find.webp',
    description: 'Mise en relation avec des artisans et prestataires certifiés au Sénégal.',
    context: 'La plateforme aide les personnes à trouver des artisans et prestataires certifiés.',
    contribution: 'Conception d’une expérience web pour rechercher et découvrir des prestataires au Sénégal.',
    focus: ['Mise en relation', 'Artisans et prestataires', 'Service destiné au Sénégal'],
    technologies: [],
    url: 'https://find-3nmq.onrender.com/',
  },
];
