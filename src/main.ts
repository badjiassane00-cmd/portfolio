import { initPortfolioController } from './controller/portfolioController';
import { projects, technologyGroups } from './model/portfolio';
import { renderProjects, renderTechnologyGroups } from './view/portfolioView';
import { initImmersion } from './immersion';

renderTechnologyGroups(technologyGroups);
renderProjects(projects);
initPortfolioController();
initImmersion();
