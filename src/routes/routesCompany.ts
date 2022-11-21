import CompanyList from 'pages/Company/list';
import CompanyCreate from 'pages/Company/create';
import IRoutes from './IRoutes';

const routesCompanyList: IRoutes[] = [
  {
    path: '/Company',
    component: CompanyList,
    protected: true,
    visibleInDisplay: true,
    displayName: 'Empresas',
    locale: 'site',
  },
  {
    path: '/Company/Create',
    component: CompanyCreate,
    protected: true,
    visibleInDisplay: false,
    displayName: 'Empresas',
    locale: 'site',
  },
];

export default routesCompanyList;
