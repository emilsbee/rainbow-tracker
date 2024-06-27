import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

import { ReactComponent as LogoutIcon } from 'icons/logout.svg';
import { ReactComponent as MenuIcon } from 'icons/list.svg';

export const NavBarWrapper = styled.div<NavBarWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  transition: all 0.25s;
  position: absolute;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.gray.dark};
  width: 65px;
  height: 100%;
  left: 0;

  ${({ closed }) => closed && css`
    transition: all 0.25s;
    left: -100px;
  `}
`;

type NavBarWrapperProps = {
  closed: boolean;
};

export const NavBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const StyledNavLink = styled(NavLink)`
  > svg {
    height: 25px;
    width: 25px;
    margin-bottom: 20px;
    fill: ${({ theme }) => theme.colors.white};

    &:hover {
      fill: ${({ theme }) => theme.colors.orange};      
    }
  }

  &.active {
    > svg {
      fill: ${({ theme }) => theme.colors.orange};
    }
  }

  &:first-child {
    margin-top: 20px;
  }
`;

export const StyledLogoutIcon = styled(LogoutIcon)`
  height: 25px;
  width: 25px;
  margin-bottom: 20px;
  fill: ${({ theme }) => theme.colors.white};

  &:hover {
    cursor: pointer;
    fill: ${({ theme }) => theme.colors.orange};
  }
`;

export const StyledMenuIcon = styled(MenuIcon)<StyledMenuIconProps>`
  height: 25px;
  width: 25px;
  transition: all 0.25s;
  position: absolute;
  fill: ${({ theme }) => theme.colors.orange};
  margin-top: 10px;
  margin-left: 80px;
  transform: rotate(90deg);

  ${({ closed }) => closed && css`
    transform: rotate(180deg);
    margin-left: 20px;
  `}

  &:hover {
    cursor: pointer;
  }
`;

type StyledMenuIconProps = {
  closed: boolean;
};
