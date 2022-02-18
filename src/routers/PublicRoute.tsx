import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationUser } from 'services/hooks';
import { ReactComponent as Loader } from '../svgIcons/spinner.svg';

/**
 * The public route requires no authentication so can be access by anyone.
 * If the user actually is authenticated, they are redirected to dashboard.
 * That's because the only public route is the login screen and if a user is
 * logged in there's no reason to display it.
 * @param props The component to render and current path.
 */
const PublicRoute = () => {
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
      {authenticated ? (
        <Navigate to="/dashboard" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PublicRoute;
