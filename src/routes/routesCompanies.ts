import Companies from 'pages/dashboard/Companies';
import IRoutes from './IRoutes';

const routesCompanies: IRoutes[] = [
  {
    path: '/dashboard/Companies',
    protected: true,
    component: Companies,
    visibleInDisplay: true,
    displayName: 'Companies',
  },
];

export default routesCompanies;
