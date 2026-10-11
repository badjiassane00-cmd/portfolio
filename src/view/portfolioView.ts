import type { Project, TechnologyGroup } from '../model/portfolio';

const escapeHtml = (value: string): string => value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char] ?? char);

export function renderTechnologyGroups(groups: TechnologyGroup[]): void {
  const root = document.querySelector<HTMLElement>('#technology-groups');
  if (!root) return;
  root.innerHTML = groups.map(({ category, items }) => `
    <details class="technology-group">
      <summary class="technology-toggle"><span class="technology-category">${escapeHtml(category)}</span><span class="technology-count">${items.length} technologies</span></summary>
      <div class="technology-list">${items.map(({ name, icon }) => `
        <div class="technology-card"><img class="technology-logo" src="/assets/technologies/${escapeHtml(icon)}.svg" alt="Logo ${escapeHtml(name)}" loading="lazy" /><span class="technology-name">${escapeHtml(name)}</span></div>`).join('')}
      </div>
    </details>`).join('');
}

export function renderProjects(projects: Project[]): void {
  const root = document.querySelector<HTMLElement>('#project-grid');
  if (!root) return;
  root.innerHTML = projects.map((project) => `
    <article class="project-card" data-category="web">
      <a class="project-image ${project.visual}-image" href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer" aria-label="Voir ${escapeHtml(project.name)} en ligne">
        <img class="project-preview" src="${escapeHtml(project.image)}" alt="Aperçu du projet ${escapeHtml(project.name)}" loading="lazy" decoding="async" /><span class="project-open">↗</span>
      </a>
      <div class="project-details"><div class="project-type"><span>Projet web</span><span>En ligne</span></div>
        <h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.description)}</p>
        <div class="project-links"><a href="${escapeHtml(project.url)}" target="_blank" rel="noreferrer">Voir le projet <span>↗</span></a>
        ${project.repository ? `<a href="${escapeHtml(project.repository)}" target="_blank" rel="noreferrer">GitHub <span>↗</span></a>` : ''}</div>
      </div>
    </article>`).join('');
}
