import styled from 'styled-components';

export const CategoryPopoverContainer = styled.div`
  left: -50px;
  top: -20px;
  border-radius: 3px;
  width: 32px;
  align-items: center;
  z-index: 100;
  position: relative;
  box-shadow: -4px 4px 15px -6px rgba(0,0,0,0.77);
  cursor: pointer;
`;

export const CategoryPopoverSquare = styled.div<CategoryPopoverSquareProps>`
  height: 22px;
  width: inherit;
  border-bottom: solid 2px ${({ theme }) => theme.colors.gray.dark};
  background-color: ${({ backgroundColor, theme }) => backgroundColor || theme.colors.blue.dark};

  &:first-child {
    border-radius: 3px 3px 0 0;
  }

  &:last-child {
    border-radius: 0 0 3px 3px;
    border-bottom: none;
  }
`;

type CategoryPopoverSquareProps = {
  backgroundColor?: string;
};
