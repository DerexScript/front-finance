import routesAbout from './routesAbout';
import routesDashboardHome from './dashboard/routesHome';
import routesHome from './routesHome';
import routesLogout from './routesLogout';
import routesDashboardRole from './dashboard/routesRole';

const routes = [...routesDashboardHome, ...routesAbout, ...routesHome, ...routesLogout, ...routesDashboardRole];

export default routes;
