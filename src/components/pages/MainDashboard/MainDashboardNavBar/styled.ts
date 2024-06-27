import styled from 'styled-components';

import { ReactComponent as BackArrow } from 'icons/back.svg';
import { ReactComponent as NextArrow } from 'icons/next.svg';

export const NavContainer = styled.div`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  width: 86%;
  margin-bottom: 20px;
  gap: 20px;
`;

export const WeekSwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray.dark};
  border-radius: 4px;
  width: 230px;
`;

export const WeekSwitchDate = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;
`;

export const StyledBackArrow = styled(BackArrow)`
  fill: white;
`;

export const StyledNextArrow = styled(NextArrow)`
  fill: white;
`;
