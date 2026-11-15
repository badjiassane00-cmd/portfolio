import type { Project, TechnologyGroup } from '../model/portfolio';
import { getLocale, projectCopy } from '../i18n';

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);

export function renderTechnologyGroups(groups: TechnologyGroup[]): void {
  const root = document.querySelector<HTMLElement>('#technology-groups');
  if (!root) return;
  const english = getLocale() === 'en';
  const categoryNames: Record<string, string> = { 'Données & stockage': 'Data & storage', 'Outils & environnements': 'Tools & environments' };
  root.innerHTML = groups.map(({ category, items }, index) => `
    <details class="technology-group" ${index === 0 ? 'open' : ''}>
      <summary class="technology-toggle"><span class="technology-index">0${index + 1}</span><span class="technology-category">${escapeHtml(english ? (categoryNames[category] ?? category) : category)}</span><span class="technology-count">${items.length} ${english ? 'tools' : 'outils'}</span><span class="technology-chevron" aria-hidden="true">↗</span></summary>
      <div class="technology-list">${items.map(({ name, icon }) => `
        <div class="technology-card"><img class="technology-logo" src="/assets/technologies/${escapeHtml(icon)}.svg" alt="" loading="lazy" decoding="async" /><span class="technology-name">${escapeHtml(name)}</span></div>`).join('')}
      </div>
    </details>`).join('');
}

export function renderProjects(projects: Project[]): void {
  const root = document.querySelector<HTMLElement>('#project-grid');
  if (!root) return;
  const featured = projects.filter((project) => project.url);
  const orderedProjects = [...featured, ...projects.filter((project) => !project.url)];
  const english = getLocale() === 'en';
  root.innerHTML = orderedProjects.map((project, index) => {
    const copy = english ? projectCopy[project.name] : undefined;
    const type = copy?.type ?? project.type;
    const description = copy?.description ?? project.description;
    return `
    <article class="project-card${project.url ? ' project-featured' : ''} project-${escapeHtml(project.visual)}" data-category="${escapeHtml(project.category)}" style="--card-index:${index}">
      <div class="project-art ${project.image ? '' : 'project-art-concept'}" aria-hidden="true">
        ${project.image ? `<img class="project-preview" src="${escapeHtml(project.image)}" alt="${english ? 'Preview of' : 'Capture de l’application'} ${escapeHtml(project.name)}" loading="lazy" decoding="async" />` : `<span class="project-art-kicker">${escapeHtml(type)}</span><span class="project-art-title">${escapeHtml(project.name)}</span><span class="project-art-mark" aria-hidden="true">${escapeHtml(project.name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2))}<i>.</i></span>`}
        ${project.url ? `<span class="project-demo-tag">${english ? 'Try the demo' : 'Démo à tester'}</span>` : ''}
        <span class="project-art-index">0${index + 1} <i>/ 0${projects.length}</i></span>
        ${project.url ? `<span class="project-live"><i></i> ${english ? 'Live demo' : 'Démo en ligne'}</span>` : `<span class="project-live project-live-private">${english ? 'Project overview' : 'Étude de projet'}</span>`}
      </div>
      <div class="project-details"><div class="project-meta"><span>${escapeHtml(type)}</span><span>${project.technologies.length ? `${project.technologies.length} ${english ? 'technologies' : 'technologies'}` : (english ? 'Web project' : 'Projet web')}</span></div>
        <div class="project-title-row"><h3>${escapeHtml(project.name)}</h3><button class="project-open" type="button" data-project="${escapeHtml(project.name)}" aria-label="${english ? 'Discover project' : 'Découvrir le projet'} ${escapeHtml(project.name)}">↗</button></div>
        <p>${escapeHtml(description)}</p>
        <div class="project-links">${project.url ? `<a class="project-demo-link" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">${english ? 'Try the demo' : 'Essayer la démo'} <span aria-hidden="true">↗</span></a>` : ''}<button class="project-detail-link" type="button" data-project="${escapeHtml(project.name)}">${english ? 'Explore project' : 'Explorer le projet'} <span aria-hidden="true">↗</span></button>${project.repository ? `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">${english ? 'Source code' : 'Code source'} <span aria-hidden="true">↗</span></a>` : ''}</div>
      </div>
    </article>`;
  }).join('');

  const counts = new Map<string, number>();
  projects.forEach(({ category }) => counts.set(category, (counts.get(category) ?? 0) + 1));
  document.querySelectorAll<HTMLElement>('[data-filter-count]').forEach((element) => {
    const filter = element.dataset.filterCount ?? 'all';
    element.textContent = String(filter === 'all' ? projects.length : counts.get(filter) ?? 0).padStart(2, '0');
  });
}

export function renderProjectDialog(project: Project, index: number, total: number): void {
  const root = document.querySelector<HTMLElement>('#dialog-content');
  if (!root) return;
  const english = getLocale() === 'en';
  const copy = english ? projectCopy[project.name] : undefined;
  const type = copy?.type ?? project.type;
  root.innerHTML = `
    <span class="dialog-kicker">${escapeHtml(type)} · ${english ? 'PROJECT OVERVIEW' : 'ÉTUDE DE PROJET'}</span>
    <h2 id="dialog-title">${escapeHtml(project.name)}</h2>
    ${project.image ? `<figure class="dialog-project-figure"><img class="dialog-project-image" src="${escapeHtml(project.image)}" alt="${english ? 'Preview of' : 'Aperçu de l’interface'} ${escapeHtml(project.name)}" loading="lazy" decoding="async" /><figcaption>${english ? 'Project interface preview' : 'Aperçu de l’interface du projet'}</figcaption></figure>` : ''}
    <p class="dialog-lead">${escapeHtml(copy?.description ?? project.description)}</p>
    <div class="dialog-section"><h3>${english ? 'The need' : 'Le besoin'}</h3><p>${escapeHtml(copy?.context ?? project.context)}</p></div>
    <div class="dialog-section"><h3>${english ? 'My contribution' : 'Ma contribution'}</h3><p>${escapeHtml(copy?.contribution ?? project.contribution)}</p></div>
    <div class="dialog-section"><h3>${english ? 'Features & focus' : 'Fonctionnalités & axes'}</h3><ul>${(copy?.focus ?? project.focus).map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
    ${project.technologies.length ? `<div class="dialog-section"><h3>${english ? 'Technologies used' : 'Technologies identifiées'}</h3><div class="dialog-tags">${project.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join('')}</div></div>` : ''}
    ${project.name === 'CampusRoom' ? `<section class="campus-demo" aria-labelledby="campus-demo-title"><h3 id="campus-demo-title">${english ? 'Try a booking simulation' : 'Tester une réservation'}</h3><p>${english ? 'Sample schedule only. This demo does not save bookings or connect to CampusRoom.' : 'Créneaux fictifs uniquement. Cette démo n’enregistre rien et ne se connecte pas à CampusRoom.'}</p><form data-campusroom-demo><label>${english ? 'Room' : 'Salle'}<select name="room"><option value="A">${english ? 'Room A' : 'Salle A'}</option><option value="B">${english ? 'Room B' : 'Salle B'}</option></select></label><label>${english ? 'Start time' : 'Début'}<input name="start" type="time" value="09:30" required /></label><label>${english ? 'End time' : 'Fin'}<input name="end" type="time" value="10:30" required /></label><button class="button button-primary" type="submit">${english ? 'Check availability' : 'Vérifier le créneau'}</button><p class="campus-demo-status" role="status" aria-live="polite">${english ? 'Choose a time to check the sample schedule.' : 'Choisissez un horaire pour consulter les créneaux fictifs.'}</p></form></section>` : ''}
    <div class="dialog-actions">${project.url ? `<a class="button button-primary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">${english ? 'View live demo' : 'Voir la démonstration'} <span aria-hidden="true">↗</span></a>` : ''}${project.repository ? `<a class="button button-outline" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">${english ? 'View source code' : 'Voir le code source'} <span aria-hidden="true">↗</span></a>` : ''}</div>
    <div class="dialog-pagination"><button type="button" data-project-step="previous">← ${english ? 'Previous project' : 'Projet précédent'}</button><span>${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span><button type="button" data-project-step="next">${english ? 'Next project' : 'Projet suivant'} →</button></div>`;
}
