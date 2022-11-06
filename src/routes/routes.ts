import routesHome from './routesHome';
import routesRelease from './routesRelease';
import routesDashboardHome from './dashboard/routesDashboardHome';
import routesLogout from './routesLogout';
import routesDashboardRole from './dashboard/routesRole';
import routesUser from './routesUser';
import routesCompany from './dashboard/routesCompany';
import routesCategory from './routesCategory';
import routesReleaseGroup from './dashboard/routesReleaseGroup';
import routesDashboardRelease from './dashboard/routesRelease';
import routesAbout from './routesAbout';

const routes = [
  ...routesHome,
  ...routesRelease,
  ...routesLogout,
  ...routesDashboardHome,
  ...routesDashboardRole,
  ...routesUser,
  ...routesCompany,
  ...routesCategory,
  ...routesReleaseGroup,
  ...routesDashboardRelease,
  ...routesAbout,
];

export default routes;
