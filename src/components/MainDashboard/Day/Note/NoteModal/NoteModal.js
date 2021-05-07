// External imports
import React, { useEffect, useState } from 'react'
import onClickOutside from "react-onclickoutside";
import PropTypes from 'prop-types'

// Internal imports 
import './NoteModal.scss'

function NoteModal  ({note, saveNote, deleteText, deleteStack, stack})  {

    const [localNote, setLocalNote] = useState(note.note)

    /**
     * Handles clicking outside of the modal.
     * Saves the note as it was in the modal at the time of the click.
     */
    NoteModal.handleClickOutside = () => {
        note.note = localNote
        saveNote(note)
    }

    /**
     * Handles text change in the modal.
     * @param e onChange event.
     */
    const handleNoteChange = (e) => {
        setLocalNote(e.target.value)
    }

    /**
     * Handles each key press. On enter and escape saves
     * the note as is.
     * @param e onKeyDown event.
     */
    const handleKeyDown = (e) => {
        if(e.which === 13 && !e.shiftKey) {        
            note.note = localNote
            saveNote(note)
            e.preventDefault();
        } else if (e.keyCode === (27)) {
            note.note = localNote
            saveNote(note)  
        }   
    }

    return (
        
            <div id="note-modal-container" onKeyDown={handleKeyDown}>
                <div id="modal-textarea">
                    <textarea 
                        autoFocus={true}  
                        type="text" 
                        id="note-modal-input" 
                        onChange={handleNoteChange}
                        spellCheck={false}
                        value={localNote}
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
        
    )
}

const clickOutsideConfig = {
    handleClickOutside: (localNote) => NoteModal.handleClickOutside
}

NoteModal.propTypes = {
    note: PropTypes.exact({
        day: PropTypes.oneOf(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).isRequired,
        note: PropTypes.string.isRequired,
        position: PropTypes.oneOf(Array.from({length: 96}, (_, i) => i + 1)).isRequired,
        stackid: PropTypes.string.isRequired
    }).isRequired, 
    stack: PropTypes.bool.isRequired,
    saveNote: PropTypes.func.isRequired, 
    deleteText: PropTypes.func.isRequired, 
    deleteStack: PropTypes.func.isRequired
}

export default onClickOutside(NoteModal, clickOutsideConfig) 