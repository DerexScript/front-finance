import RoleList from 'pages/dashboard/Role/list';
import RoleCreate from 'pages/dashboard/Role/create';
import IRoutes from '../IRoutes';

const routesDashboardRole: IRoutes[] = [
  {
    path: '/dashboard/Role',
    component: RoleList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Role',
  },
  {
    path: '/dashboard/Role/Create',
    component: RoleCreate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'RoleCreate',
  },
];

export default routesDashboardRole;
