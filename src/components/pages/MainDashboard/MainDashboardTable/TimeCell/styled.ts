import styled, { css } from 'styled-components';

export const TimeCellsContainer = styled.div`
  width: 48px;
  margin-right: 24px;
  margin-left: 24px;
  margin-top: 55px;
  position: sticky;
  left: 0;
`;

export const TimeCell = styled.div<TimeCellProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 24px;
  width: 48px;
  transition: 0.15s;

  ${({ active }) => active && css`
    background-color: #314149;
  `}
`;

type TimeCellProps = {
  active: boolean;
};
