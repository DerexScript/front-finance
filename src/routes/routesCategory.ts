import AboutList from 'pages/Dashboard/About/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/Category',
    protected: false,
    component: AboutList,
    visibleInDisplay: true,
    displayName: 'Categorias',
  },
];

export default routesAbout;
