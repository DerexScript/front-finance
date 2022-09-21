import RoleList from 'pages/Dashboard/Role/list';
import RoleCreate from 'pages/Dashboard/Role/create';
import RoleUpdate from 'pages/Dashboard/Role/update';
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
  { path: '/dashboard/Role/Update/:idRole', component: RoleUpdate },
];

export default routesDashboardRole;
