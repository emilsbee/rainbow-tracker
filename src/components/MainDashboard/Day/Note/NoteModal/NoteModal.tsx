// External imports
import React, { useState } from "react";

// Internal imports
import "./NoteModal.scss";
import { Note } from "../../../../../store/notes/notes";

type NoteModalProps = {
  note: Note,
  saveNote: (note: Note) => void,
  deleteText: (note: Note) => void,
  deleteStack: (note: Note) => void,
  stack: boolean
}

function NoteModal({ note, saveNote, deleteText, deleteStack, stack }: NoteModalProps)  {

  const [localNote, setLocalNote] = useState<string>(note.note);

  /**
     * Handles text change in the modal.
     * @param e onChange event.
     */
  const handleNoteChange = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalNote(e.target.value);
  };

  /**
     * Handles each key press. On enter and escape saves
     * the note as is.
     * @param e onKeyDown event.
     */
  const handleKeyDown = (e:  React.KeyboardEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      note.note = localNote;
      saveNote(note);
      e.preventDefault();
    } else if (e.key === "Escape") {
      note.note = localNote;
      saveNote(note);
    }
  };

  return (
    <div id="note-modal-container" onKeyDown={handleKeyDown} onClick={(e) => e.stopPropagation()}>
      <div id="modal-textarea">
        <textarea
          autoFocus={true}
          id="note-modal-input"
          onChange={handleNoteChange}
          spellCheck={false}
          value={localNote}
          onKeyUp={(e) => e.stopPropagation()}
        />
      </div>
      <div>
        <div id="note-modal-button-container">
          {stack &&
                                <div
                                  id="note-modal-delete-button"
                                  onClick={() => deleteStack(note)}
                                >
                                    Delete stack
                                </div>
          }
          <div
            id="note-modal-delete-button"
            onClick={() => deleteText(note)}
          >
                                    Delete text
          </div>

        </div>

      </div>
    </div>

  );
}

export default NoteModal;
