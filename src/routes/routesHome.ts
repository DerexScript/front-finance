import HomeList from 'pages/Home/list';
import IRoutes from './IRoutes';

const routesHome: IRoutes[] = [
  {
    path: '/Home',
    component: HomeList,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
  {
    path: '/',
    component: HomeList,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Home',
  },
];

export default routesHome;
