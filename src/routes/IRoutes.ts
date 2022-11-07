export default interface IRoutes {
  path: string;
  visibleInDisplay?: boolean;
  displayName?: string;
  protected?: boolean;
  locale?: 'site' | 'dashboard';
  component: () => JSX.Element;
}
