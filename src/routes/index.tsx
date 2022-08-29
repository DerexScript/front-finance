import React from 'react';
import {
  Routes as Switch,
  Route,
  Outlet,
  Navigate,
  unstable_HistoryRouter as Router,
} from 'react-router-dom';
import routes from './routes';
import Login from 'pages/Login';
import useAuth from 'routes/auth';
import history from 'routes/history';

function Routes(): JSX.Element {
  return (
    <Router history={history}>
      <Switch>
        <Route
          path='/'
          element={useAuth() ? <Outlet /> : <Navigate to='/login' />}
        >
          {routes.map((route, key) => (
            <Route key={key} path={route.path} element={<route.component />} />
          ))}
          <Route path='/*' element={<Navigate to='/dashboard/Home' />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Switch>
    </Router>
  );
}

export default Routes;
