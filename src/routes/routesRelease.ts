import Release from 'pages/Release/list';
import IRoutes from './IRoutes';

const routesReleaseSite: IRoutes[] = [
  {
    path: '/Company/:companyID/ReleasesGroups/:releaseGroupID',
    protected: true,
    component: Release,
    visibleInDisplay: false,
    displayName: 'Lançamentos',
    locale: 'site',
  },
];

export default routesReleaseSite;
