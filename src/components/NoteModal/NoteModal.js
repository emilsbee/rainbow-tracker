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
        deleteNoteStack({noteid, day, index, weekid})
        closeModal()        
    }

    const handleSaveNote = () => {
        saveNote({note: localNote, noteid, day})
        closeModal()
    }

    NoteModal.handleClickOutside = (localNote) => {
        var textareaText = localNote.target.children[0].children[1].children[0].defaultValue
        saveNote({note: textareaText, noteid, day})
        closeModal()
    }

    
    return (
        
            <div className="note-modal-container">
                <div className="note-modal-header">
                    <span className="note-modal-title" onClick={handleSaveNote}>&times;</span>
                </div>  
                <div className="modal-textarea">
                    <textarea 
                        autoFocus={true}  
                        type="text" 
                        className="input" 
                        defaultValue={localNote} 
                        onChange={(e) => setLocalNote(e.target.value)}
                        spellCheck={false}
                    >
                    </textarea>
                </div>
                <div>
                    <div className="note-modal-button-container">
                        <div 
                            className="note-modal-save-button" 
                            onClick={handleSaveNote}
                        >
                            Save
                        </div>
                        {indices.length > 1 && 
                            <div 
                                className="note-modal-delete-button"  
                                onClick={handleDeleteNoteStack}
                            >
                                Delete
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        
    )
}

const clickOutsideConfig = {
    handleClickOutside: (localNote) => NoteModal.handleClickOutside
}

export default onClickOutside(NoteModal, clickOutsideConfig) 