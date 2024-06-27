import * as React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuthenticationUser } from 'hooks';

const PrivateRoute: React.FC = () => {
  const { authenticated, determined } = useAuthenticationUser();

  if (!determined) return null;

  return (
    <>
      {authenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default PrivateRoute;
