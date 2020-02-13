import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import auth from '../../utils/auth';
import * as routerTypes from '../../config/routeTypes'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.userIsLoguedIn() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: routerTypes.AUTH_LOGIN,
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

export default PrivateRoute;
