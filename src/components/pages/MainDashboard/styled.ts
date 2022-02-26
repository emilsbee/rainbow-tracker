import styled from 'styled-components';

export const MainDashboardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray.background};
`;
