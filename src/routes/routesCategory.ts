import AboutList from 'pages/dashboard/About/list';
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
