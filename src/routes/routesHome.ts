import HomeList from 'pages/dashboard/Home/list';
import IRoutes from './IRoutes';

const routesHome: IRoutes[] = [
  {
    path: '/dashboard/Home',
    component: HomeList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Home',
  },
];

export default routesHome;
