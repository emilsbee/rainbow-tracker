import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationUser } from 'hooks';

import NavBar from '../components/BasicComponents/NavBar/NavBar';
import { ReactComponent as Loader } from '../svgIcons/spinner.svg';

/**
 * useEffect hook checks whether the current user is logged in. See
 * docs/check-login-status.
 */
const PrivateRoute = () => {
  const { authenticated, determined } = useAuthenticationUser();

  if (!determined) {
    return (
      <div className="login-loading">
        <Loader style={{ height: '6rem', width: '6rem' }} />
      </div>
    );
  }

  return (
    <>
      {authenticated && <NavBar />}
      {authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default PrivateRoute;
