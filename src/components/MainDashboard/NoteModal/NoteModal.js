// External imports
import React, { useEffect, useState } from 'react'
import onClickOutside from "react-onclickoutside";
import PropTypes from 'prop-types'

// Internal imports 
import './NoteModal.scss'

function NoteModal  ({note, saveNote, deleteText, deleteStack, stack})  {

    const [localNote, setLocalNote] = useState('')

    useEffect(() => {
        setLocalNote(note.note)
    }, [note])
    

    NoteModal.handleClickOutside = (localNote) => {
        var textareaText = localNote.target.children[0].children[0].children[0].value
        note.note = textareaText
        saveNote(note)
    }

    const handleNoteChange = (e) => {
        setLocalNote(e.target.value)
    }
    
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
        
            <div className="note-modal-container" onKeyDown={handleKeyDown}>
                <div className="modal-textarea">
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
                     <div className="note-modal-button-container">
                            {stack && 
                                <div 
                                    className="note-modal-delete-button"  
                                    onClick={() => deleteStack(note)}
                                >
                                    Delete stack
                                </div>
                            }
                                <div 
                                    className="note-modal-delete-button"  
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