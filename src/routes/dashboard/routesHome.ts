import HomeList from 'pages/Dashboard/Home/list';
import IRoutes from '../IRoutes';

const routesDashboardHome: IRoutes[] = [
  {
    path: '/dashboard/Home',
    component: HomeList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Home',
  },
  {
    path: '/dashboard/',
    component: HomeList,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
];

export default routesDashboardHome;
