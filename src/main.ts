import { initPortfolioController } from './controller/portfolioController';
import { projects, technologyGroups } from './model/portfolio';
import { renderProjects, renderTechnologyGroups } from './view/portfolioView';
import { initLanguage } from './i18n';
import { initImmersion } from './immersion';

renderTechnologyGroups(technologyGroups);
renderProjects(projects);
initLanguage();
window.addEventListener('portfolio:languagechange', () => {
  renderProjects(projects);
  renderTechnologyGroups(technologyGroups);
});
initPortfolioController();
initImmersion();
