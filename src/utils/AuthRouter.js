import React, { useContext } from 'react';

import { Route, Redirect } from 'react-router-dom';
import { authContext } from '../context/authContext';


function AuthRoute({ component: Component, ...rest }) {
  const { user } = useContext(authContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Component {...props} />)
            }
    />
  );
}

export default AuthRoute;
