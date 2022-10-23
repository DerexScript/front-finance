import CategoryList from 'pages/Dashboard/Category/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/Category',
    protected: false,
    component: CategoryList,
    visibleInDisplay: true,
    displayName: 'Categorias',
  },
];

export default routesAbout;
