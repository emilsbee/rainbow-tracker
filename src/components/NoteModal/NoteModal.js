// External imports
import React, { useEffect, useState } from 'react'
import onClickOutside from "react-onclickoutside";
import { useStoreActions } from 'easy-peasy';

// Internal imports 
import './note-modal.scss'

function NoteModal  ({ closeModal, note, saveNote, noteid, day, index, weekid, indices})  {
    const deleteNoteStack = useStoreActions(actions => actions.weeks.deleteNoteStack)

    const [localNote, setLocalNote] = useState('')

    useEffect(() => {
        
        setLocalNote(note)
    }, [note])

    const handleDeleteNoteStack = () => {
        deleteNoteStack({noteid, day, index, weekid, note: localNote})
        closeModal()        
    }

    const handleSaveNote = () => {
        closeModal(localNote)
        saveNote({note: localNote, noteid, day})
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
        if (e.keyCode === (27)) {
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