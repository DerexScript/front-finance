import React from 'react';
import {
  Routes as Switch,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import routes from './routes';
import Login from 'pages/Login';
import { AuthProvider } from 'context/AuthProvider';
import { ProtectedLayout } from 'components/ProtectedLayout';
import Logout from 'pages/Logout';

function Routes(): JSX.Element {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='*' element={<Navigate to='/Login' />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
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
