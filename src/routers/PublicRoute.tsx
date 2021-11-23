// External imports
import React from "react";
import { Route, Redirect } from "react-router-dom";

// Internal imports
import { useStoreState } from "../store/hookSetup";

/**
 * The public route requires no authentication so can be access by anyone.
 * If the user actually is authenticated, they are redirected to dashboard.
 * That's because the only public route is the login screen and if a user is
 * logged in there's no reason to display it.
 * @param props The component to render and current path.
 */
const PublicRoute = (props:{path:string, component: React.FC, exact: boolean}) => {

  const uid = useStoreState((state) => state.auth.uid);
  const isAuthenticated = !!uid;
  const Component = props.component;

  return (
    <Route path={props.path} component={() => (
      isAuthenticated ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component />
      )
    )} />
  );
};

export default PublicRoute;
