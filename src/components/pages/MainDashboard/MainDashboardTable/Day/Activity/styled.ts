import styled, { css } from 'styled-components';

export const ActivityItemContainer = styled.div<ActivityItemContainerProps>`
  height: 22px;
  width: 22px;
  border-radius: 3px;
  padding: 0 4px 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: transparent; */

  ${({ isActive }) => isActive && css`
    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => theme.colors.blue.light};
    }
  `}
`;

type ActivityItemContainerProps = {
  isActive: boolean;
};
