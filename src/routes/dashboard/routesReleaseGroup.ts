import ReleaseGroupList from 'pages/Dashboard/ReleaseGroup/list';
import ReleaseGroupUpdate from 'pages/Dashboard/ReleaseGroup/update';
import ReleaseGroupCreate from 'pages/Dashboard/ReleaseGroup/create';
import IRoutes from '../IRoutes';

const routesDashboardReleaseGroup: IRoutes[] = [
  {
    path: '/dashboard/ReleaseGroup',
    component: ReleaseGroupList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Grupo de lançamento',
  },
  {
    path: '/dashboard/ReleaseGroup/Update/:idReleaseGroup',
    component: ReleaseGroupUpdate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Grupo de lançamento',
  },
  {
    path: '/dashboard/ReleaseGroup/Create/',
    component: ReleaseGroupCreate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Grupo de lançamento',
  },
];

export default routesDashboardReleaseGroup;
