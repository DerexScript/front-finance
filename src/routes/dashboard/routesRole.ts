import RoleList from 'pages/Dashboard/Role/list';
import IRoutes from '../IRoutes';

const routesDashboardRole: IRoutes[] = [
  {
    path: '/dashboard/Role',
    component: RoleList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Role',
  },
];

export default routesDashboardRole;
