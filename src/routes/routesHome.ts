import Home from 'pages/home/Home';
import IRoutes from './IRoutes';

const routesDashboardHome: IRoutes[] = [
  {
    path: '/Home',
    component: Home,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
];

export default routesDashboardHome;
