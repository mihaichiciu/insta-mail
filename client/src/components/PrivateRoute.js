import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function mapStateToProps({ auth }) {
  return { auth };
}

const PrivateRoute = ({ children, auth, ...rest }) => {
  debugger;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default connect(mapStateToProps)(PrivateRoute);
