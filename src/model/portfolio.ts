export type TechnologyStatus = 'mastered' | 'project' | 'learning';

export interface Technology {
  name: string;
  icon: string;
  level?: TechnologyStatus;
  proof?: string;
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
  architecture?: string;
  technologies: string[];
  image?: string;
  url?: string;
  repository?: string;
  visual: 'terra' | 'patrimoine' | 'prestalink' | 'campusroom';
}

export const technologyGroups: TechnologyGroup[] = [
  {
    category: 'Front-end',
    items: [
      { name: 'HTML', icon: 'html5', level: 'mastered', proof: 'CampusRoom · Patrimoine' },
      { name: 'CSS', icon: 'css3', level: 'mastered', proof: 'TERRA · CampusRoom · Patrimoine' },
      { name: 'JavaScript', icon: 'javascript', level: 'mastered', proof: 'CampusRoom · Patrimoine · TERRA' },
      { name: 'TypeScript', icon: 'typescript', level: 'project', proof: 'TERRA · Patrimoine' },
      { name: 'Vue.js', icon: 'vuejs', level: 'learning', proof: 'Apprentissage front-end' },
      { name: 'React', icon: 'react', level: 'project', proof: 'Patrimoine' },
    ],
  },
  {
    category: 'Back-end',
    items: [
      { name: 'PHP', icon: 'php', level: 'mastered', proof: 'CampusRoom' },
      { name: 'Laravel', icon: 'laravel', level: 'mastered', proof: 'CampusRoom · PrestaLink' },
      { name: 'Node.js', icon: 'nodejs', level: 'project', proof: 'TERRA · Patrimoine' },
      { name: 'Express.js', icon: 'expressjs', level: 'project', proof: 'Patrimoine' },
    ],
  },
  {
    category: 'Bases de données',
    items: [
      { name: 'MySQL', icon: 'mysql', level: 'mastered', proof: 'CampusRoom · TERRA' },
      { name: 'PostgreSQL', icon: 'postgresql', level: 'project', proof: 'Patrimoine · TERRA' },
    ],
  },
  {
    category: 'Outils & environnements',
    items: [
      { name: 'Git', icon: 'git', level: 'mastered', proof: 'Tous les projets' },
      { name: 'GitHub', icon: 'github', level: 'mastered', proof: 'TERRA · Patrimoine · CampusRoom' },
      { name: 'GitLab', icon: 'gitlab', level: 'project', proof: 'CampusRoom' },
      { name: 'Docker', icon: 'docker', level: 'project', proof: 'CampusRoom · TERRA' },
      { name: 'Postman', icon: 'postman', level: 'project', proof: 'API REST · CampusRoom' },
      { name: 'Linux', icon: 'linux', level: 'project', proof: 'Environnement de travail local' },
    ],
  },
];

export const projects: Project[] = [
  {
    name: 'CampusRoom', type: 'Réservation de salles universitaires', category: 'fullstack', visual: 'campusroom', image: '/assets/projects/campusroom-screenshot.webp',
    description: 'Application de réservation universitaire qui centralise le catalogue des salles et les demandes, avec vérification des disponibilités avant enregistrement.',
    context: 'Les demandes par courriel peuvent créer des doublons et compliquent la vérification des créneaux ainsi que le suivi des réservations.',
    contribution: 'Conception et développement des parcours de réservation, des règles métier (salle active, capacité, durée et chevauchements) et des interfaces web et API.',
    focus: ['Catalogue des salles et gestion des ressources multimédias', 'Contrôle des conflits horaires, de la capacité et de l’état des salles', 'Parcours web et API JSON avec rôles et autorisations', 'Archivage des réservations terminées dans MongoDB'],
    architecture: 'Laravel sépare routes, contrôleurs, validation, services et dépôts. MySQL porte les données relationnelles; MongoDB archive les réservations terminées. Les médias privés passent par des stratégies de stockage local, GridFS ou S3 compatible, avec une présentation Blade ou JSON.',
    technologies: ['PHP 8.3', 'Laravel 13', 'MySQL', 'MongoDB', 'Redis', 'Docker Compose', 'GitLab CI/CD'],
    repository: 'https://gitlab.com/badjiassane00-cmd/campusroom',
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
    url: 'https://patrimoine-5o5f.onrender.com/',
    repository: 'https://github.com/badjiassane00-cmd/patrimoine',
  },
  {
    name: 'PrestaLink', type: 'Mise en relation', category: 'web', visual: 'prestalink', image: '/assets/projects/find.webp',
    description: 'Plateforme de mise en relation entre particuliers et prestataires certifiés au Sénégal.',
    context: 'La plateforme aide les personnes à trouver des artisans et prestataires certifiés.',
    contribution: 'Conception d’une expérience web pour rechercher et découvrir des prestataires au Sénégal.',
    focus: ['Mise en relation', 'Artisans et prestataires', 'Service destiné au Sénégal'],
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Laravel', 'MySQL'],
    url: 'https://find-3nmq.onrender.com/',
    repository: 'https://github.com/badjiassane00-cmd/find',
  },
];
