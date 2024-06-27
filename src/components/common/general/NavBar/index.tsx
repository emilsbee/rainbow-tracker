import * as React from 'react';

import { useAuthenticationActions } from 'hooks';
import { ReactComponent as DashboardIcon } from 'icons/dashboard.svg';
import { ReactComponent as SettingsIcon } from 'icons/settings.svg';
import { ReactComponent as AnalyticsIcon } from 'icons/analytics.svg';

import {
  NavBarWrapper, NavBarContainer, StyledNavLink,
  StyledMenuIcon, StyledLogoutIcon,
} from './styled';

export const NavBar = () => {
  const { logout } = useAuthenticationActions();
  const [closed, setClosed] = React.useState(true);

  const beginLogout = () => {
    logout();
  };

  return (
    <>
      <NavBarWrapper closed={closed}>
        <NavBarContainer>
          <StyledNavLink to="/dashboard">
            <DashboardIcon />
          </StyledNavLink>

          <StyledNavLink to="/analytics">
            <AnalyticsIcon />
          </StyledNavLink>

          <StyledNavLink to="/settings">
            <SettingsIcon />
          </StyledNavLink>
        </NavBarContainer>

        <StyledLogoutIcon onClick={beginLogout} />
      </NavBarWrapper>

      <StyledMenuIcon closed={closed} onClick={() => setClosed(!closed)} />
    </>

  );
};
