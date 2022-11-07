import Home from 'pages/Home/list';
import IRoutes from './IRoutes';

const routesDashboardHome: IRoutes[] = [
  {
    path: '/Home',
    component: Home,
    protected: false,
    visibleInDisplay: true,
    displayName: 'Home',
    locale: 'site',
  },
  {
    path: '/',
    component: Home,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
    locale: 'site',
  },
];

export default routesDashboardHome;
