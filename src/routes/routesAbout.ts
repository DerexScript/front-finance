import AboutList from 'pages/dashboard/About/list';
import IRoutes from './IRoutes';

const routesAbout: IRoutes[] = [
  {
    path: '/dashboard/About',
    component: AboutList,
    visibleInDisplay: true,
    displayName: 'About',
  },
];

export default routesAbout;
