import Home from 'pages/Home/list';
import IRoutes from './IRoutes';

const routesDashboardHome: IRoutes[] = [
  {
    path: '/Home',
    component: Home,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
  {
    path: '/',
    component: Home,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
];

export default routesDashboardHome;
