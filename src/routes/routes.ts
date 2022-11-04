import routesAbout from './routesAbout';
import routesCompany from './dashboard/routesCompany';
import routesDashboardHome from './dashboard/routesDashboardHome';
import routesUser from './routesUser';
import routesCategory from './routesCategory';
import routesHome from './routesHome';
import routesLogout from './routesLogout';
import routesDashboardRole from './dashboard/routesRole';
import routesEntry from './routesEntry';

const routes = [
  ...routesHome,
  ...routesDashboardHome,
  ...routesAbout,
  ...routesCompany,
  ...routesUser,
  ...routesCategory,
  ...routesLogout,
  ...routesDashboardRole,
  ...routesEntry,
];

export default routes;
