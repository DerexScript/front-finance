import Logout from 'pages/Logout';
import IRoutes from './IRoutes';

const routesHome: IRoutes[] = [
  {
    path: '/logout',
    component: Logout,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Logout',
  },
];

export default routesHome;
