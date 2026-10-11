import { initPortfolioController } from './controller/portfolioController';
import { projects, technologyGroups } from './model/portfolio';
import { renderProjects, renderTechnologyGroups } from './view/portfolioView';

renderTechnologyGroups(technologyGroups);
renderProjects(projects);
initPortfolioController();
