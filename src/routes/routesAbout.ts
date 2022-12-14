import AboutList from 'pages/Dashboard/About/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/About',
    protected: false,
    component: AboutList,
    visibleInDisplay: true,
    displayName: 'Sobre',
  },
];

export default routesAbout;
