import routesAbout from './routesAbout';
import routesCompany from './routesCompany';
import routesDashboardHome from './routesDashboardHome';
import routesUser from './routesUser';
import routesCategory from './routesCategory';
import routesHome from './routesHome';

const routes = [
  ...routesHome,
  ...routesDashboardHome,
  ...routesAbout,
  ...routesCompany,
  ...routesUser,
  ...routesCategory,
];

export default routes;
