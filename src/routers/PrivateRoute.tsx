import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import NavBar from '../components/BasicComponents/NavBar/NavBar';
import { useStoreActions, useStoreState } from '../store/hookSetup';
import { checkIfLoggedIn } from '../store/auth/helpers';
import { ReactComponent as Loader } from '../svgIcons/spinner.svg';

/**
 * useEffect hook checks whether the current user is logged in. See
 * docs/check-login-status.
 */
const PrivateRoute = () => {
  // Store state
  const setuid = useStoreActions((actions) => actions.auth.setuid);
  const uid = useStoreState((state) => state.auth.uid);

  // Local state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {

    (async function () {
      const userid = window.localStorage.getItem('userid');

      if (userid) {
        const loggedIn: boolean = await checkIfLoggedIn(userid);

        if (loggedIn) {
          setuid({ userid });
          setLoading(false);
        } else {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    })();

  }, [uid, checkIfLoggedIn, setLoading]);

  if (loading) {
    return (
      <div className="login-loading">
        <Loader style={{ height: '6rem', width: '6rem' }} />
      </div>
    );
  }

  return (
    <>
      {!!uid && <NavBar />}
      {!!uid ? (
        <Outlet />
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};
export default PrivateRoute;
