import * as i from 'types';
import * as React from 'react';

import { Button } from 'common/interaction';

import {
  NoteModalContainer, ModalTextAreaContainer, ModalTextArea,
  ModalButtonContainer,
} from './styled';

export const NoteModal: React.FC<NoteModalProps> = ({
  note, saveNote, deleteText, deleteStack, stack,
}) => {
  const [localNote, setLocalNote] = React.useState<string>(note.note);

  const handleNoteChange = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNote(e.target.value);
  };

  const handleKeyDown = (e:  React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter' && !e.shiftKey) {
      note.note = localNote;
      saveNote(note);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      note.note = localNote;
      saveNote(note);
    }
  };

  return (
    <NoteModalContainer onKeyDown={handleKeyDown} onClick={(e) => e.stopPropagation()}>
      <ModalTextAreaContainer>
        <ModalTextArea
          autoFocus
          onChange={handleNoteChange}
          spellCheck={false}
          value={localNote}
          onKeyUp={(e) => e.stopPropagation()}
        />
      </ModalTextAreaContainer>
      <ModalButtonContainer>
        {stack && (
          <Button variant="secondary" onClick={() => deleteStack(note)}>Delete stack</Button>
        )}
        <Button onClick={() => deleteText(note)}>Delete text</Button>
      </ModalButtonContainer>
    </NoteModalContainer>
  );
};

type NoteModalProps = {
  note: i.Note;
  saveNote: (note: i.Note) => void;
  deleteText: (note: i.Note) => void;
  deleteStack: (note: i.Note) => void;
  stack: boolean;
};
