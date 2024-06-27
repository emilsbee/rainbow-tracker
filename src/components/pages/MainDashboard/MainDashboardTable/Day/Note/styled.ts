import styled from 'styled-components';

import { Text } from 'common';

import { getStackHeight, CONSTANTS } from './helpers';

const NoteBase = styled.div`
  border: 0.5px solid rgba(196, 136, 82, 0.65);
  border-radius: ${CONSTANTS.NOTE_BORDER_RADIUS};

  width: ${CONSTANTS.NOTE_WIDTH};

  margin-bottom: ${CONSTANTS.NOTE_MARGIN_BOTTOM};
  margin-left: ${CONSTANTS.NOTE_MARGIN_LEFT};

  padding-left: ${CONSTANTS.NOTE_PADDING_LEFT_RIGHT};
  padding-right: ${CONSTANTS.NOTE_PADDING_LEFT_RIGHT};

  text-align: center;

  display: flex;
  flex-direction: column;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;

export const NoteContainer = styled(NoteBase)`
  line-height: ${CONSTANTS.NOTE_HEIGHT};
  height: ${CONSTANTS.NOTE_HEIGHT};
  white-space: nowrap;
`;

export const NoteText = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${({ theme }) => theme.colors.gray.light};
  font-size: 13px;
`;

export const StackContainer = styled(NoteBase)<StackContainerProps>`
  /* This odd combination (with WebkitLineClamp in NoteItem.tsx)
  produces the ellipsis in multiline text. The WebkitLineClamp
  specifies how many lines of text should the text take, which
  is basically the amount of notes since 1 line is set to be
  the same height as a note. */
  overflow-wrap: break-word;
  overflow: hidden;
  height: ${({ max, min }) => getStackHeight(max, min, CONSTANTS.NOTE_HEIGHT, CONSTANTS.NOTE_MARGIN_BOTTOM)};
`;

type StackContainerProps = {
  max: number;
  min: number;
};

export const StackText = styled(Text)<StackTextProps>`
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.colors.gray.light};
  font-size: 13px;
  -webkit-line-clamp: ${({ max, min }) => max - min};
`;

type StackTextProps = {
  max: number;
  min: number;
};
