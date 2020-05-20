// External imports
import React, { useEffect, useState } from 'react'

// Internal imports 
import './note-modal.scss'
import { ReactComponent as Logo } from './check.svg'

const NoteModal  = ({ closeModal, note, saveNote, noteid, day, deleteNoteStack, index, weekid}) => {
    const [localNote, setLocalNote] = useState('')

    useEffect(() => {
        setLocalNote(note)
    }, [])

    const handleDeleteNoteStack = () => {
        deleteNoteStack({noteid, day, index, weekid})
        closeModal()
        
    }

    return (
        <div className="modal" id="myModal">
              <div className="modal-content">
                <textarea autoFocus={true}  type="text" className="input" defaultValue={localNote} onChange={(e) => setLocalNote(e.target.value)}></textarea>
                <div className="button-container">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <Logo className="save" onClick={() => saveNote(localNote, noteid, day)}/>
                    <button onClick={handleDeleteNoteStack}>Delete</button>
                </div>
            </div>
        </div>
    )
}

export default NoteModal