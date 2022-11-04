import Companies from 'pages/Dashboard/Companies/list';
import CreateCompany from 'pages/Dashboard/Companies/create';
import UpdateCompany from 'pages/Dashboard/Companies/update';
import DeleteCompany from 'pages/Dashboard/Companies/delete';
import IRoutes from '../IRoutes';

const routesCompanies: IRoutes[] = [
  {
    path: '/dashboard/Company',
    protected: true,
    component: Companies,
    visibleInDisplay: true,
    displayName: 'Empresas',
  },
  {
    path: '/dashboard/Company/Create',
    protected: true,
    component: CreateCompany,
    visibleInDisplay: false,
    displayName: 'Empresas',
  },
  {
    path: '/dashboard/Company/Update/:idCompany',
    protected: true,
    component: UpdateCompany,
    visibleInDisplay: false,
    displayName: 'Empresas',
  },
  {
    path: '/dashboard/Company/Delete/:idCompany',
    protected: true,
    component: DeleteCompany,
    visibleInDisplay: false,
    displayName: 'Empresas',
  },
];

export default routesCompanies;
