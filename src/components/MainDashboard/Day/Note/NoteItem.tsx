import * as i from 'types';
import React from 'react';

import './Note.scss';
import { useStoreActions } from '../../../../store/hookSetup';
import { getStackHeight, CONSTANTS } from './helpers';

type NoteComponentProps = {
  note: i.Note;
  max: number;
  min: number;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, note: i.Note) => void;
  onDragEnter: (note: i.Note) => void;
  onClick: (note: i.Note) => void;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>, note: i.Note) => void;
};

const NoteComponent = ({
  note,
  max,
  min,
  onDragStart,
  onDragEnter,
  onClick,
  onMouseDown,
}: NoteComponentProps) => {
  const setHoverIndex = useStoreActions(
    (actions) => actions.settings.setHoverIndex,
  );

  if (max === min) {
    return (
      <div
        className="note-container"
        onMouseOver={() => setHoverIndex({ timeHoverIndex: min - 1 })}
        onClick={() => onClick(note)}
        draggable={true}
        onDragStart={(e) => onDragStart(e, note)}
        // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
        onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
      >
        <p className="note-text">{note.note}</p>
      </div>
    );
  }
  return (
    <div
      onMouseOver={() => setHoverIndex({ timeHoverIndex: min - 1 })}
      className="stack-container"
      style={{
        height: getStackHeight(
          max,
          min,
          CONSTANTS.NOTE_HEIGHT,
          CONSTANTS.NOTE_MARGIN_BOTTOM,
        ),
        // WebkitLineClamp: max-min+1
      }}
      onClick={() => onClick(note)}
      onMouseDown={(e) => onMouseDown(e, note)}
      draggable={true}
      onDragStart={(e) => onDragStart(e, note)}
      // onDragEnter={() => onDragEnter(note)} // slower but kinda smoother
      onDragOver={() => onDragEnter(note)} // fast drag but leaves tail
    >
      <p className="stack-text" style={{ WebkitLineClamp: max - min }}>
        {note.note}
      </p>
    </div>
  );
};

export default NoteComponent;
