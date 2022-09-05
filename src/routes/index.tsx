import React from 'react';
import {
  Routes as Switch,
  Route,
  unstable_HistoryRouter as Router,
} from 'react-router-dom';
import routes from './routes';

import Login from 'pages/Login';

import history from 'routes/history';
import { AuthProvider } from 'context/AuthProvider';
import { ProtectedLayout } from 'components/ProtectedLayout';

function Routes(): JSX.Element {
  return (
    <AuthProvider>
      <Router history={history}>
        <Switch>
          <Route path='*' element={<div>Page Not Found 404.</div>} />
          <Route path='/login' element={<Login />} />
          {routes.map((route, key) => (
            <Route
              key={key}
              path={route.path}
              element={
                <ProtectedLayout protected={route?.protected as boolean}>
                  <route.component />
                </ProtectedLayout>
              }
            />
          ))}
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default Routes;
