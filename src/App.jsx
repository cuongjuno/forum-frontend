import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFoundPage from './pages/NotFoundPage';
import routes from './routes';

export default function App() {
  // eslint-disable-next-line no-shadow
  const showContentMenu = (routes) => {
    let result = null;
    if (routes.length > 0) {
      result = routes.map((route, index) => (
        <Route
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      ));
    }
    return result;
  };

  return (
    <Router>
      <div className="d-flex wrap_all">
        <Switch>
          {showContentMenu(routes)}
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
