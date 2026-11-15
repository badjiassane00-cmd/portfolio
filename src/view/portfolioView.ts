import type { Project, TechnologyGroup } from '../model/portfolio';

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);

export function renderTechnologyGroups(groups: TechnologyGroup[]): void {
  const root = document.querySelector<HTMLElement>('#technology-groups');
  if (!root) return;
  root.innerHTML = groups.map(({ category, items }, index) => `
    <details class="technology-group" ${index === 0 ? 'open' : ''}>
      <summary class="technology-toggle"><span class="technology-index">0${index + 1}</span><span class="technology-category">${escapeHtml(category)}</span><span class="technology-count">${items.length} outils</span><span class="technology-chevron" aria-hidden="true">↗</span></summary>
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
  root.innerHTML = orderedProjects.map((project, index) => `
    <article class="project-card${project.url ? ' project-featured' : ''} project-${escapeHtml(project.visual)}" data-category="${escapeHtml(project.category)}" style="--card-index:${index}">
      <div class="project-art ${project.image ? '' : 'project-art-concept'}" aria-hidden="true">
        ${project.image ? `<img class="project-preview" src="${escapeHtml(project.image)}" alt="Capture de l’application ${escapeHtml(project.name)}" loading="lazy" decoding="async" />` : `<span class="project-art-kicker">${escapeHtml(project.type)}</span><span class="project-art-title">${escapeHtml(project.name)}</span><span class="project-art-mark" aria-hidden="true">${escapeHtml(project.name.split(/\s+/).map((word) => word[0]).join('').slice(0, 2))}<i>.</i></span>`}
        ${project.url ? '<span class="project-demo-tag">Démo à tester</span>' : ''}
        <span class="project-art-index">0${index + 1} <i>/ 0${projects.length}</i></span>
        ${project.url ? '<span class="project-live"><i></i> Démo en ligne</span>' : '<span class="project-live project-live-private">Étude de projet</span>'}
      </div>
      <div class="project-details"><div class="project-meta"><span>${escapeHtml(project.type)}</span><span>${project.technologies.length ? `${project.technologies.length} technologies` : 'Projet web'}</span></div>
        <div class="project-title-row"><h3>${escapeHtml(project.name)}</h3><button class="project-open" type="button" data-project="${escapeHtml(project.name)}" aria-label="Découvrir le projet ${escapeHtml(project.name)}">↗</button></div>
        <p>${escapeHtml(project.description)}</p>
        <div class="project-links">${project.url ? `<a class="project-demo-link" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">Essayer la démo <span aria-hidden="true">↗</span></a>` : ''}<button class="project-detail-link" type="button" data-project="${escapeHtml(project.name)}">Explorer le projet <span aria-hidden="true">↗</span></button>${project.repository ? `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">Code source <span aria-hidden="true">↗</span></a>` : ''}</div>
      </div>
    </article>`).join('');

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
  root.innerHTML = `
    <span class="dialog-kicker">${escapeHtml(project.type)} · ÉTUDE DE PROJET</span>
    <h2 id="dialog-title">${escapeHtml(project.name)}</h2>
    ${project.image ? `<figure class="dialog-project-figure"><img class="dialog-project-image" src="${escapeHtml(project.image)}" alt="Aperçu de l’interface ${escapeHtml(project.name)}" loading="lazy" decoding="async" /><figcaption>Aperçu de l’interface du projet</figcaption></figure>` : ''}
    <p class="dialog-lead">${escapeHtml(project.description)}</p>
    <div class="dialog-section"><h3>Le besoin</h3><p>${escapeHtml(project.context)}</p></div>
    <div class="dialog-section"><h3>Ma contribution</h3><p>${escapeHtml(project.contribution)}</p></div>
    <div class="dialog-section"><h3>Fonctionnalités & axes</h3><ul>${project.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></div>
    ${project.technologies.length ? `<div class="dialog-section"><h3>Technologies identifiées</h3><div class="dialog-tags">${project.technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join('')}</div></div>` : ''}
    <div class="dialog-actions">${project.url ? `<a class="button button-primary" href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer">Voir la démonstration <span aria-hidden="true">↗</span></a>` : ''}${project.repository ? `<a class="button button-outline" href="${escapeHtml(project.repository)}" target="_blank" rel="noopener noreferrer">Voir le code source <span aria-hidden="true">↗</span></a>` : ''}</div>
    <div class="dialog-pagination"><button type="button" data-project-step="previous">← Projet précédent</button><span>${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</span><button type="button" data-project-step="next">Projet suivant →</button></div>`;
}
