import UserList from 'pages/Dashboard/User/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/Users',
    protected: true,
    component: UserList,
    visibleInDisplay: true,
    displayName: 'Usuários',
  },
];

export default routesAbout;
