import AboutList from 'pages/Dashboard/About/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/User',
    protected: false,
    component: AboutList,
    visibleInDisplay: true,
    displayName: 'Usuários',
  },
];

export default routesAbout;
