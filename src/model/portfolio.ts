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
  url: string;
  repository?: string;
  description: string;
  visual: 'terra' | 'patrimoine' | 'find';
  label: string;
}

export const technologyGroups: TechnologyGroup[] = [
  { category: 'Langages', items: [{ name: 'PHP', icon: 'php' }, { name: 'JavaScript', icon: 'javascript' }, { name: 'HTML5', icon: 'html5' }, { name: 'CSS3', icon: 'css3' }, { name: 'SQL', icon: 'sql' }, { name: 'Python', icon: 'python' }, { name: 'TypeScript', icon: 'typescript' }] },
  { category: 'Frameworks & bibliothèques', items: [{ name: 'Laravel', icon: 'laravel' }, { name: 'Vue.js', icon: 'vuejs' }, { name: 'React', icon: 'react' }, { name: 'Express.js', icon: 'expressjs' }, { name: 'Tailwind CSS', icon: 'tailwindcss' }] },
  { category: 'Bases de données', items: [{ name: 'MySQL', icon: 'mysql' }, { name: 'PostgreSQL', icon: 'postgresql' }, { name: 'Redis', icon: 'redis' }] },
  { category: 'Gestion de versions', items: [{ name: 'Git', icon: 'git' }, { name: 'GitHub', icon: 'github' }, { name: 'GitLab', icon: 'gitlab' }] },
  { category: 'Outils de développement', items: [{ name: 'VS Code', icon: 'vscode' }, { name: 'Composer', icon: 'composer' }, { name: 'npm', icon: 'npm' }, { name: 'Vite', icon: 'vite' }] },
  { category: 'DevOps & CI/CD', items: [{ name: 'Docker', icon: 'docker' }, { name: 'Docker Compose', icon: 'docker-compose' }, { name: 'GitLab CI/CD', icon: 'gitlab-cicd' }] },
  { category: 'Déploiement', items: [{ name: 'Render', icon: 'render' }, { name: 'Vercel', icon: 'vercel' }, { name: 'Docker Hub', icon: 'docker-hub' }] },
  { category: 'Stockage', items: [{ name: 'MinIO', icon: 'minio' }, { name: 'API S3', icon: 's3' }] },
];

export const projects: Project[] = [
  { name: 'TERRA', url: 'https://terra-web-avn6.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/TERRA', description: 'Découvrez le projet TERRA directement dans son environnement en ligne.', visual: 'terra', label: 'TERRA' },
  { name: 'Patrimoine', url: 'https://patrimoine-5o5f.onrender.com/', repository: 'https://github.com/badjiassane00-cmd/patrimoine', description: 'Parcourez l’expérience Patrimoine et découvrez le projet en ligne.', visual: 'patrimoine', label: 'Patrimoine' },
  { name: 'Find', url: 'https://find-3nmq.onrender.com/', description: 'Ouvrez Find pour découvrir le projet et son expérience en ligne.', visual: 'find', label: 'find.' },
];
