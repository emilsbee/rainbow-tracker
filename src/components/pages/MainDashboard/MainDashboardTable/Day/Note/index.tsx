import * as i from 'types';
import * as React from 'react';

import { useStoreActions } from '../../../../../../store/hookSetup';
import { NoteContainer, NoteText, StackContainer, StackText } from './styled';

export const Note: React.FC<NoteProps> = ({
  note, max, min, onDragStart,
  onDragEnter, onClick, onMouseDown,
}) => {
  const setHoverIndex = useStoreActions(
    (actions) => actions.settings.setHoverIndex,
  );

  if (max === min) {
    return (
      <NoteContainer
        onMouseOver={() => setHoverIndex({ timeHoverIndex: min - 1 })}
        onClick={() => onClick(note)}
        draggable
        onDragStart={(e) => onDragStart(e, note)}
        // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
        onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
      >
        <NoteText>{note.note}</NoteText>
      </NoteContainer>
    );
  }

  return (
    <StackContainer
      onMouseOver={() => setHoverIndex({ timeHoverIndex: min - 1 })}
      max={max}
      min={min}
      onClick={() => onClick(note)}
      onMouseDown={(e) => onMouseDown(e, note)}
      draggable={true}
      onDragStart={(e) => onDragStart(e, note)}
      // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
      onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
    >
      <StackText max={max} min={min}>{note.note}</StackText>
    </StackContainer>
  );
};

type NoteProps = {
  note: i.Note;
  max: number;
  min: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, note: i.Note) => void;
  onDragEnter: (note: i.Note) => void;
  onClick: (note: i.Note) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>, note: i.Note) => void;
};
