// External imports
import React, { useEffect, useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports 
import './note-modal.scss'

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
                        className="input" 
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

export default onClickOutside(NoteModal, clickOutsideConfig) 