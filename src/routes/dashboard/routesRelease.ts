import ReleaseList from 'pages/Dashboard/Release/list';
import ReleaseUpdate from 'pages/Dashboard/Release/update';
import ReleaseCreate from 'pages/Dashboard/Release/create';
import IRoutes from '../IRoutes';

const routesDashboardRelease: IRoutes[] = [
  {
    path: '/dashboard/Release',
    component: ReleaseList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Lançamentos',
  },
  {
    path: '/dashboard/Release/Update/:idRelease',
    component: ReleaseUpdate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Lançamentos',
  },
  {
    path: '/dashboard/Release/Create/',
    component: ReleaseCreate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Lançamentos',
  },
];

export default routesDashboardRelease;
