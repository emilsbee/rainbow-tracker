import styled from 'styled-components';

export const NoteModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 512px;
  max-width: 90%;
  height: fit-content;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.gray.dark};
  box-shadow: 0 1px 3px #333333;
  border: solid 0.8px $dark-primary;
  padding: 15px;
`;

export const ModalTextAreaContainer = styled.div`
  height: 130px;
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const ModalTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.orange};
  border-radius: 8px;
  padding: 8px;
  outline: none;
  resize: none;
  font-weight: 300;
  font-size: 14px;
  background-color: ${({ theme }) => theme.colors.gray.background};
  color: ${({ theme }) => theme.colors.white};
`;

export const ModalButtonContainer = styled.div`
  height: 38px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  column-gap: 10px;
`;
