import React from 'react';
import Login from './pages/auth/Login';

const dashboardRoutes = [
  {
    path: '/',
    exact: true,
    main: (props) => <Login {...props} />,
  },
];
export default dashboardRoutes;
