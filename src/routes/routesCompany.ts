import Companies from 'pages/dashboard/Companies';
import IRoutes from './IRoutes';

const routesCompanies: IRoutes[] = [
  {
    path: '/dashboard/Company',
    protected: true,
    component: Companies,
    visibleInDisplay: true,
    displayName: 'Empresas',
  },
];

export default routesCompanies;
