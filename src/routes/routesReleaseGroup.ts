import ReleaseGroupList from 'pages/ReleaseGroup/list';
import IRoutes from './IRoutes';

const routesReleaseGroupSite: IRoutes[] = [
  {
    path: '/Company/:companyID/ReleasesGroups',
    protected: true,
    component: ReleaseGroupList,
    visibleInDisplay: false,
    displayName: 'Grupo de lançamento',
    locale: 'site',
  },
];

export default routesReleaseGroupSite;
