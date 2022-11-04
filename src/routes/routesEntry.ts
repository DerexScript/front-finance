import Entry from 'pages/Entry/list';
import IRoutes from './IRoutes';

const routesEntry: IRoutes[] = [
  {
    path: '/Entry/:id/Company',
    protected: true,
    component: Entry,
    visibleInDisplay: false,
    displayName: 'Lançamentos',
  },
];

export default routesEntry;
