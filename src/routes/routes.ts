import routesAbout from './routesAbout';
import routesDashboardHome from './dashboard/routesHome';
import routesHome from './routesHome';

const routes = [...routesDashboardHome, ...routesAbout, ...routesHome];

export default routes;
