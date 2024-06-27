import * as i from 'types';
import * as React from 'react';

import { findNoteStackExtremes } from 'services';

import { Note } from '../Note';
import { NoteContainer } from './styled';

export const DayNotes: React.FC<DayNotesProps> = ({ notes, onClick }) => {
  const handleDragStart = () => {
    // TODO
  };

  const handleDragEnter = () => {
    // TODO
  };

  const handleMouseDown = () => {
    // TODO
  };

  return (
    <NoteContainer>
      {notes.map((note: i.Note) => {
        const { max, min } = findNoteStackExtremes(notes, note.stackid);

        if (note.notePosition === min) { // If the note is highest from notes with the same stackid
          return (
            <Note
              key={note.notePosition}
              note={note}
              max={max}
              min={min}
              onDragStart={handleDragStart}
              onDragEnter={handleDragEnter}
              onClick={onClick}
              onMouseDown={handleMouseDown}
            />
          );
        } else return null;
      })}
    </NoteContainer>
  );
};

type DayNotesProps = {
  notes: i.Note[];
  onClick: (note: i.Note) => void;
};

// // Note logic
// const [dragNote, setDragNote] = useState<i.Note | null>(null);

// const onNoteDragStart = (e: React.DragEvent<HTMLDivElement>, note: i.Note) => {
//   e.dataTransfer.setDragImage(initDragImageState(), 1, 1); // Sets the ghost image

//   setDragNote(note); // Sets the initial drag note (local state)
//   setHoverIndex({ timeHoverIndex: note.notePosition - 1 });
// };

// const onNoteDragEnter = (note: i.Note) => {
//   if (dragNote) { // Checks if the dragging comes from a note rather than a category
//     const noteExtremes = findNoteStackExtremes(notes, note.stackid);
//     const dragExtremes = findNoteStackExtremes(notes, dragNote.stackid);

//     if (note.notePosition > dragExtremes.max) { // If drag downwards
//       setHoverIndex({ timeHoverIndex: dragExtremes.max });
//       belowDifference({
//         draggedIntoPosition: note.notePosition,
//         dragPosition: dragNote.notePosition,
//         weekDay: note.weekDay,
//         dragStackid: dragNote.stackid,
//         oldStackid: note.stackid,
//         oldNote: note.note,
//       });
//     } else if (note.notePosition < dragExtremes.min) { // If drag upwards
//       setHoverIndex({ timeHoverIndex: dragExtremes.min - 2 });
//       aboveDifference({
//         draggedIntoPosition: noteExtremes.max,
//         dragPosition: dragNote.notePosition,
//         weekDay: note.weekDay,
//         dragStackid: dragNote.stackid,
//         dragNoteText: dragNote.note,
//       });
//     }
//   }
// };

// // Delete note stack when mouse wheel is pressed on a stack
// const onNoteMouseDown = (e: React.MouseEvent, note: i.Note) => {
//   const { max, min } = findNoteStackExtremes(notes, note.stackid);
//   if (e.button === 1 && controlPress && (max !== min)) {
//     deleteNoteText(note);
//     deleteNoteStack({
//       weekDay: note.weekDay,
//       stackid: note.stackid,
//     });
//   } else if (e.button === 1 && (max !== min)) {
//     deleteNoteStack({
//       weekDay: note.weekDay,
//       stackid: note.stackid,
//     });
//   }
// };
// };
