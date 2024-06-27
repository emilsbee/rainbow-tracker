import styled from 'styled-components';

export const ActivityPopoverContainer = styled.div`
  left: -30px;
  top: -20px;
  position: relative;
  border-radius: 5px;
  background-color: #2A353C;
  width: 42px;
  align-items: center;
  z-index: 200;
  box-shadow: -4px 4px 15px -6px rgba(0,0,0,0.77);
  cursor: pointer;
`;

export const ActivityPopoverColor = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: ${({ theme }) => theme.colors.gray.dark} 2px solid;
  height: 22px;
  width: 100%;

  &:first-child {
    border-radius: 5px 5px 0 0;
  }

  &:last-child {
    border-radius: 0 0 5px 5px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray.background};
  }
`;
