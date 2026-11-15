export type Locale = 'fr' | 'en';

const strings: Record<string, string> = {
  'Aller au contenu': 'Skip to content', 'Navigation principale': 'Main navigation', 'À propos': 'About', 'Expertise': 'Expertise', 'Vidéo': 'Video', 'Projets': 'Projects', 'Contact': 'Contact', 'Recruteur': 'For recruiters',
  'DÉVELOPPEUR FULL-STACK JUNIOR · DAKAR': 'JUNIOR FULL-STACK DEVELOPER · DAKAR', 'Je conçois des applications web de bout en bout — des interfaces aux API et aux bases de données — pour répondre à des besoins concrets.': 'I build end-to-end web applications — from interfaces to APIs and databases — to solve real-world needs.',
  'Du Web au Mobile': 'From Web to Mobile', 'Interfaces': 'Interfaces', 'Applications': 'Applications', 'Expériences numériques': 'Digital experiences', 'Découvrir mes projets': 'Explore my projects', 'Explorer l’univers': 'Explore my world', 'Télécharger mon CV': 'Download my CV', 'Lire le résumé de la présentation vidéo': 'Read the video presentation summary',
  'Assane Badji est développeur Full-Stack junior à Dakar. Il conçoit des applications web, de l’interface aux API et aux bases de données, à travers des projets pratiques.': 'Assane Badji is a junior full-stack developer in Dakar. He builds web applications, from interfaces to APIs and databases, through hands-on projects.', 'DÉFILER POUR EXPLORER': 'SCROLL TO EXPLORE',
  '02 / À PROPOS': '02 / ABOUT', 'UN PEU DE CONTEXTE': 'A LITTLE CONTEXT', 'Comprendre le besoin.': 'Understand the need.', 'Construire la bonne réponse.': 'Build the right solution.', 'J’aime créer des outils qui rendent les choses plus simples — pour les personnes qui les utilisent comme pour celles qui les font évoluer.': 'I enjoy creating tools that make things simpler — for the people who use them and the people who improve them.', 'Mon travail va de l’interface aux données et aux services en arrière-plan. J’aborde chaque projet avec curiosité, attention au détail et envie d’apprendre : comprendre le problème, concevoir une expérience cohérente, puis la faire fonctionner de bout en bout.': 'My work spans interfaces, data and back-end services. I approach every project with curiosity, attention to detail and a willingness to learn: understand the problem, design a coherent experience, then make it work end to end.', 'Faire connaissance': 'Get in touch', 'Écouter': 'Listen', 'le besoin': 'to the need', 'Penser': 'Consider', 'l’expérience': 'the experience', 'Construire': 'Build', 'avec soin': 'with care', 'Améliorer': 'Improve', 'dans le temps': 'over time', 'Formation & parcours': 'Education & background', 'Formation en développement Web & Mobile': 'Web & Mobile Development Training', 'Licence en Mathématiques, Physique et Informatique (MPI)': 'Bachelor’s in Mathematics, Physics and Computer Science', 'Université Cheikh Anta Diop de Dakar': 'Cheikh Anta Diop University of Dakar', 'Baccalauréat scientifique': 'Science High School Diploma',
  '03 / EXPERTISE': '03 / EXPERTISE', 'OUTILS & TECHNOLOGIES': 'TOOLS & TECHNOLOGIES', 'Une boîte à outils': 'A toolkit', 'pour construire.': 'for building.', 'Les technologies que j’ai utilisées dans mes projets, présentées par domaine.': 'Technologies I have used in my projects, grouped by area.', 'Interfaces & applications': 'Interfaces & applications', 'Interfaces modernes, applications Web, Front-End, Back-End, API et bases de données.': 'Modern interfaces, web applications, front end, back end, APIs and databases.', 'Applications mobiles': 'Mobile applications', 'Interfaces conçues pour les smartphones, expérience tactile et logique applicative adaptée aux usages mobiles.': 'Smartphone interfaces, touch experiences and application logic tailored to mobile use.', 'Voir les projets Web': 'View web projects', 'Parlons d’un projet mobile': 'Discuss a mobile project',
  '04 / SÉLECTION': '04 / SELECTED WORK', 'PROJETS CONÇUS & DÉVELOPPÉS': 'PROJECTS DESIGNED & BUILT', 'Des projets réels.': 'Real projects.', 'Des réponses concrètes.': 'Practical solutions.', 'Les projets avec démo sont en tête : essayez-les directement ou ouvrez leur fiche pour en savoir plus.': 'Projects with live demos come first: try them directly or open a project page to learn more.', 'Tous mes dépôts': 'All repositories', 'Filtrer les projets': 'Filter projects', 'Tous': 'All', 'Applications web': 'Web applications', 'Full stack': 'Full stack',
  '05 / CONTACT': '05 / CONTACT', 'OUVERT AUX ÉCHANGES': 'OPEN TO OPPORTUNITIES', 'UNE IDÉE, UN STAGE, UNE COLLABORATION ?': 'AN IDEA, AN INTERNSHIP, A COLLABORATION?', 'La suite commence': 'What comes next', 'par une conversation.': 'starts with a conversation.', 'Vous recrutez ou avez un projet à faire avancer ? Écrivez-moi directement.': 'Hiring or looking to move a project forward? Get in touch directly.', 'M’envoyer un e-mail': 'Send me an email', 'Copier l’adresse e-mail': 'Copy email address', 'Adresse e-mail copiée.': 'Email address copied.', 'Copie impossible. Adresse :': 'Could not copy. Address:', 'Ou préparer un message personnalisé': 'Or prepare a custom message', 'Votre nom': 'Your name', 'Votre e-mail': 'Your email', 'Nom et prénom': 'Full name', 'Sujet': 'Subject', 'Votre message': 'Your message', 'Préparer mon message': 'Prepare my message', 'Retour en haut': 'Back to top', 'Fait avec attention au Sénégal': 'Made with care in Senegal', 'Parlons de votre projet': 'Let’s discuss your project',
  'Entrer dans l’univers': 'Enter my world', 'Fermer le menu': 'Close menu', 'Ouvrir le menu': 'Open menu', 'Activer le thème clair': 'Switch to light theme', 'Activer le thème sombre': 'Switch to dark theme', 'Étude de projet': 'Project overview', 'Démo à tester': 'Try the demo', 'Démo en ligne': 'Live demo', 'Projet web': 'Web project', 'technologies': 'technologies', 'Essayer la démo': 'Try the demo', 'Explorer le projet': 'Explore project', 'Code source': 'Source code', 'Découvrir le projet': 'Discover the project', 'Fiche détaillée d’un projet': 'Detailed project view', 'Fermer la fiche projet': 'Close project details', 'Le besoin': 'The need', 'Ma contribution': 'My contribution', 'Fonctionnalités & axes': 'Features & focus', 'Technologies identifiées': 'Technologies used', 'Voir la démonstration': 'View live demo', 'Voir le code source': 'View source code', 'Projet précédent': 'Previous project', 'Projet suivant': 'Next project',
  'PROFIL EXPRESS': 'QUICK PROFILE', 'POUR LES RECRUTEURS': 'FOR RECRUITERS', 'DAKAR · SÉNÉGAL': 'DAKAR · SENEGAL', 'Développeur Full-Stack.': 'Full-Stack Developer.', 'Développement web de bout en bout, interfaces accessibles et applications reliées à leurs API et données.': 'End-to-end web development, accessible interfaces and applications connected to APIs and data.', 'Télécharger le CV': 'Download CV', '01 / FORMATION': '01 / EDUCATION', 'Orange Digital Center · 2025–2026': 'Orange Digital Center · 2025–2026', 'Licence MPI · Université Cheikh Anta Diop de Dakar': 'BSc in Mathematics, Physics & Computer Science · Cheikh Anta Diop University of Dakar', '02 / COMPÉTENCES': '02 / SKILLS', 'De l’interface aux données': 'From interface to data', '03 / DÉMOS EN LIGNE': '03 / LIVE DEMOS', 'Projets à découvrir': 'Projects to explore', '04 / CONTACT DIRECT': '04 / DIRECT CONTACT', 'Échangeons': 'Let’s talk', 'Salle': 'Room', 'Début': 'Start time', 'Fin': 'End time', 'Vérifier le créneau': 'Check availability', 'Choisissez un horaire pour consulter les créneaux fictifs.': 'Choose a time to check the sample schedule.', 'AUTO · SANS SON': 'AUTO · MUTED', 'DÉVELOPPEMENT WEB & MOBILE': 'WEB & MOBILE DEVELOPMENT', '© 2026 · Fait avec attention au Sénégal': '© 2026 · Made with care in Senegal',
  'Votre application e-mail s’ouvrira avec votre message prêt à envoyer.': 'Your email app will open with your message ready to send.', 'vous@exemple.com': 'you@example.com', 'Comment pouvons-nous travailler ensemble ?': 'How can we work together?', 'Quelques lignes sur votre projet ou votre recherche…': 'A few lines about your project or what you are looking for…', 'Changer de thème': 'Change theme', 'Vidéo de présentation d’Assane Badji, lecture automatique sans son': 'Assane Badji presentation video, autoplay muted',
};

export const projectCopy: Record<string, { type: string; description: string; context: string; contribution: string; focus: string[] }> = {
  CampusRoom: { type: 'Room booking app', description: 'A central tool for browsing university rooms and managing bookings.', context: 'Email booking requests can create duplicates and make availability hard to check. CampusRoom centralizes the room catalogue and bookings.', contribution: 'Developed a room management application with users, roles and bookings.', focus: ['Room catalogue', 'Time conflict detection', 'Web interface and JSON API', 'Private room media'] },
  'StoreManager Pro': { type: 'Management ERP', description: 'A PHP ERP project focused on business management and data modelling.', context: 'The project organizes a management system around users, products, customers, suppliers, orders, debts and delivery notes.', contribution: 'Designed a store management application focused on products and inventory.', focus: ['Product management', 'Customers and suppliers', 'Orders and sales', 'Debts and deliveries'] },
  'TERRA Web': { type: 'Web project', description: 'A web platform for collecting and sharing biodiversity information.', context: 'Ecosystem information and biodiversity observations benefit from a shared, accessible space.', contribution: 'Developed a biodiversity platform with ecosystem and observation features.', focus: ['Centralized information', 'Ecosystems', 'Observations', 'Data sharing'] },
  Patrimoine: { type: 'Web project', description: 'A web platform dedicated to heritage management.', context: 'The project focuses on designing a web space for heritage management.', contribution: 'Contributed to the platform design and development.', focus: ['Heritage management', 'Platform design', 'Web development'] },
  PrestaLink: { type: 'Service marketplace', description: 'Connects people with certified craftspeople and service providers in Senegal.', context: 'The platform helps people find certified craftspeople and service providers.', contribution: 'Designed a web experience to find and discover service providers in Senegal.', focus: ['Connecting people and providers', 'Craftspeople and services', 'A service for Senegal'] },
};

let current: Locale = 'fr';
export const getLocale = (): Locale => current;

export function setLocale(locale: Locale): void {
  current = locale;
  document.documentElement.lang = locale;
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node: Node | null;
  while ((node = walker.nextNode())) {
    const text = node.textContent ?? '';
    const trimmed = text.trim();
    if (!trimmed) continue;
    const translated = locale === 'en' ? strings[trimmed] : Object.entries(strings).find(([, english]) => english === trimmed)?.[0];
    if (translated) node.textContent = text.replace(trimmed, translated);
  }
  document.querySelectorAll<HTMLElement>('[aria-label]').forEach((element) => {
    const value = element.getAttribute('aria-label') ?? '';
    const translated = locale === 'en' ? strings[value] : Object.entries(strings).find(([, english]) => english === value)?.[0];
    if (translated) element.setAttribute('aria-label', translated);
  });
  document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[placeholder]').forEach((element) => {
    const value = element.placeholder;
    const translated = locale === 'en' ? strings[value] : Object.entries(strings).find(([, english]) => english === value)?.[0];
    if (translated) element.placeholder = translated;
  });
  document.querySelectorAll<HTMLElement>('[title]').forEach((element) => {
    const value = element.title;
    const translated = locale === 'en' ? strings[value] : Object.entries(strings).find(([, english]) => english === value)?.[0];
    if (translated) element.title = translated;
  });
  const button = document.querySelector<HTMLButtonElement>('.language-toggle');
  if (button) { button.textContent = locale === 'fr' ? 'EN' : 'FR'; button.setAttribute('aria-label', locale === 'fr' ? 'Switch to English' : 'Passer en français'); }
  document.title = locale === 'en' ? 'Assane Badji — Web & Mobile Developer' : 'Assane Badji — Développeur Web & Mobile';
  document.querySelector<HTMLMetaElement>('meta[name="description"]')?.setAttribute('content', locale === 'en' ? 'Assane Badji, junior full-stack developer in Dakar. Web applications built from interface to APIs and databases.' : 'Assane Badji, développeur Full-Stack junior à Dakar. Applications web conçues de l’interface aux API et aux bases de données.');
  const rotatingSkill = document.querySelector<HTMLElement>('.rotating-skill');
  if (rotatingSkill) rotatingSkill.dataset.words = locale === 'en' ? 'Interfaces|Applications|Digital experiences' : 'Interfaces|Applications|Expériences numériques';
  document.querySelector<HTMLMetaElement>('meta[property="og:title"]')?.setAttribute('content', document.title);
  document.querySelector<HTMLMetaElement>('meta[property="og:description"]')?.setAttribute('content', document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content ?? '');
  window.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { locale } }));
}

export function initLanguage(): void {
  let saved: string | null = null;
  try { saved = localStorage.getItem('portfolio-language'); } catch { /* Language preference remains temporary. */ }
  setLocale(saved === 'en' ? 'en' : 'fr');
  document.querySelector<HTMLButtonElement>('.language-toggle')?.addEventListener('click', () => {
    const next = current === 'fr' ? 'en' : 'fr';
    setLocale(next);
    try { localStorage.setItem('portfolio-language', next); } catch { /* Keep the selected language for this page. */ }
  });
}
