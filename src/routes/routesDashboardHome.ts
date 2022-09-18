import HomeList from 'pages/dashboard/Home/list';
import IRoutes from './IRoutes';

const routesDashboardHome: IRoutes[] = [
  {
    path: '/dashboard/Home',
    component: HomeList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Home',
  },
];

export default routesDashboardHome;
