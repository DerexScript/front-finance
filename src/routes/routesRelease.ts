import Release from 'pages/Release/list';
import IRoutes from './IRoutes';

const routesRelease: IRoutes[] = [
  {
    path: '/Release/:id/Company',
    protected: true,
    component: Release,
    visibleInDisplay: false,
    displayName: 'Lançamentos',
  },
];

export default routesRelease;
