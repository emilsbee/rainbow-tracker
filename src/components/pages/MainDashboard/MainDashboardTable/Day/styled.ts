import styled from 'styled-components';

export const DayContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

export const DayHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding-left: 55px;
  
  &:hover {
    cursor: default;
  }
`;

export const DayCompositionContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

export const DayCategories = styled.div`
  width: 47px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const NodeModalWrapper = styled.div`
  position: absolute;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`;
