import CompanyList from 'pages/Company/list';
import IRoutes from './IRoutes';

const routesCompanyList: IRoutes[] = [
  {
    path: '/Company',
    component: CompanyList,
    protected: false,
    visibleInDisplay: true,
    displayName: 'Empresas',
    locale: 'site',
  },
];

export default routesCompanyList;
