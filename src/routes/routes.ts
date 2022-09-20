import routesAbout from './routesAbout';
import routesCompany from './routesCompany';
import routesDashboardHome from './routesDashboardHome';
import routesUser from './routesUser';
import routesCategory from './routesCategory';
import routesHome from './routesHome';
import routesLogout from './routesLogout';
import routesDashboardRole from './dashboard/routesRole';

const routes = [
  ...routesHome,
  ...routesDashboardHome,
  ...routesAbout,
  ...routesCompany,
  ...routesUser,
  ...routesCategory,
  ...routesLogout,
  ...routesDashboardRole,
];

export default routes;
