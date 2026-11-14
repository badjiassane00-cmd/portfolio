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
  focus: string[];
  technologies: string[];
  image?: string;
  url?: string;
  repository?: string;
  visual: 'terra' | 'patrimoine' | 'prestalink' | 'campusroom' | 'storemanager';
}

export const technologyGroups: TechnologyGroup[] = [
  { category: 'Front-end', items: [{ name: 'HTML5', icon: 'html5' }, { name: 'CSS3', icon: 'css3' }, { name: 'JavaScript', icon: 'javascript' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'Vue.js', icon: 'vuejs' }, { name: 'React', icon: 'react' }, { name: 'Tailwind CSS', icon: 'tailwindcss' }] },
  { category: 'Back-end', items: [{ name: 'PHP', icon: 'php' }, { name: 'Laravel', icon: 'laravel' }, { name: 'Express.js', icon: 'expressjs' }, { name: 'Python', icon: 'python' }] },
  { category: 'Données & stockage', items: [{ name: 'MySQL', icon: 'mysql' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }, { name: 'MinIO', icon: 'minio' }, { name: 'API S3', icon: 's3' }, { name: 'SQL', icon: 'sql' }] },
  { category: 'Outils & environnements', items: [{ name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'GitLab', icon: 'gitlab' }, { name: 'Docker', icon: 'docker' }, { name: 'Docker Compose', icon: 'docker-compose' }, { name: 'GitLab CI/CD', icon: 'gitlab-cicd' }, { name: 'Composer', icon: 'composer' }, { name: 'npm', icon: 'npm' }, { name: 'Vite', icon: 'vite' }, { name: 'VS Code', icon: 'vscode' }, { name: 'Render', icon: 'render' }, { name: 'Vercel', icon: 'vercel' }, { name: 'Docker Hub', icon: 'docker-hub' }] },
];

export const projects: Project[] = [
  {
    name: 'CampusRoom', type: 'Application de réservation', category: 'fullstack', visual: 'campusroom',
    description: 'Un outil centralisé pour consulter les salles universitaires et gérer leurs réservations.',
    context: 'Les demandes de réservation par e-mail créent des doublons et ne permettent pas de vérifier simplement la disponibilité. CampusRoom centralise le catalogue des salles et les réservations.',
    focus: ['Catalogue des salles', 'Détection des conflits horaires', 'Interface web et API JSON', 'Médias privés des salles'],
    technologies: ['PHP', 'Laravel', 'MySQL', 'MongoDB', 'Redis', 'Docker', 'GitLab CI/CD'],
    repository: 'https://gitlab.com/badjiassane00-cmd/campusroom',
  },
  {
    name: 'StoreManager Pro', type: 'ERP de gestion', category: 'fullstack', visual: 'storemanager',
    description: 'Un projet ERP en PHP orienté gestion commerciale et modélisation des données.',
    context: 'Le projet organise les objets d’un système de gestion autour des utilisateurs, produits, clients, fournisseurs, commandes, dettes et bons de livraison.',
    focus: ['Gestion des produits', 'Clients et fournisseurs', 'Commandes et ventes', 'Dettes et livraisons'],
    technologies: ['PHP', 'Programmation orientée objet', 'PostgreSQL', 'SQLite'],
    repository: 'https://github.com/badjiassane00-cmd/StoreManager-Pro',
  },
  {
    name: 'TERRA Web', type: 'Projet web', category: 'web', visual: 'terra', image: '/assets/projects/terra.webp',
    description: 'Une expérience web accessible dans son environnement en ligne.',
    context: 'Le projet est consultable en ligne et dispose d’un dépôt source public.',
    focus: ['Application web', 'Démonstration publique'],
    technologies: [],
    url: 'https://terra-web-avn6.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/TERRA',
  },
  {
    name: 'Patrimoine', type: 'Projet web', category: 'web', visual: 'patrimoine', image: '/assets/projects/patrimoine.webp',
    description: 'Un projet web présenté dans son environnement en ligne.',
    context: 'Une démonstration publique permet de découvrir le projet; son code source est également disponible.',
    focus: ['Application web', 'Démonstration publique'],
    technologies: [],
    url: 'https://patrimoine-5o5f.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/patrimoine',
  },
  {
    name: 'PrestaLink', type: 'Mise en relation', category: 'web', visual: 'prestalink', image: '/assets/projects/find.webp',
    description: 'Mise en relation avec des artisans et prestataires certifiés au Sénégal.',
    context: 'La plateforme aide les personnes à trouver des artisans et prestataires certifiés.',
    focus: ['Mise en relation', 'Artisans et prestataires', 'Service destiné au Sénégal'],
    technologies: [],
    url: 'https://find-3nmq.onrender.com/',
  },
];
