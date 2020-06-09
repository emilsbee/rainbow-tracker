// External imports
import React, { useEffect, useState } from 'react'
import onClickOutside from "react-onclickoutside";

// Internal imports 
import './note-modal.scss'

function NoteModal  ({ closeModal, note, saveNote, noteid, day, index, weekid, indices,handleMouseDown})  {
    

    const [localNote, setLocalNote] = useState('')

    useEffect(() => {
        
        setLocalNote(note)
    }, [note])

    const handleDeleteNoteStack = () => {
        handleMouseDown({button: 1, preventDefault: () => {}})
        closeModal()        
    }


    NoteModal.handleClickOutside = (localNote) => {
        var textareaText = localNote.target.children[0].children[0].children[0].value
        closeModal(textareaText)
        saveNote({note: textareaText, noteid, day})
    }

    const handleNoteChange = (e) => {
        setLocalNote(e.target.value)
    }
    
    const handleKeyDown = (e) => {
        if(e.which === 13 && !e.shiftKey) {        
                      
            closeModal(localNote)
            saveNote({note: localNote, noteid, day})
            e.preventDefault();
        } else if (e.keyCode === (27)) {
            closeModal(localNote)
            saveNote({note: localNote, noteid, day})
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
                    { indices.length > 1 && <div className="note-modal-button-container">
                            <div 
                                className="note-modal-delete-button"  
                                onClick={handleDeleteNoteStack}
                            >
                                Delete
                            </div>
                        </div>
                    }
                </div>
            </div>
        
    )
}

const clickOutsideConfig = {
    handleClickOutside: (localNote) => NoteModal.handleClickOutside
}

export default onClickOutside(NoteModal, clickOutsideConfig) 