import styled from 'styled-components';

export const CategoryItemContainer = styled.div`
  height: 22px;
  display: flex;
  flex-direction: row;
  margin-bottom: 2px;
`;

export const CategoryItemColor = styled.div<CategoryItemColorProps>`
  height: 22px;
  width: 20px;
  border-radius: 3px;
  margin-right: 6px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  &:hover {
    cursor: pointer;
  }
`;

type CategoryItemColorProps = {
  backgroundColor: string;
};
