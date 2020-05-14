// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import NoteModal from '../NoteModal/NoteModal'
import CategoryItem from '../CategoryItem/CategoryItem'
import Note from '../Note/Note'
import {timeValues} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'
import './main-dashboard-table.scss'

const MainDashboardTable  = ({ days, weekid, notes, indexNotes, noteIndices }) => {

    
    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)
    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
    const [localWeek, setLocalWeek] = useState(false)
    
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')

    const [localNotes, setLocalNotes] = useState(false)
    const [localIndexNotes, setLocalIndexNotes] = useState(false) 
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    const [noteModal, setNoteModal] = useState(false)
    const [localNote, setLocalNote] = useState('')

    useEffect(() => {
        var currentWeek = {}
        currentWeek["days"] = orderByDays(days)
        currentWeek["weekid"] = weekid
        setLocalWeek(currentWeek)
    }, [days])

    useEffect(() => {
        setLocalNotes(notes)
    }, [notes])

    useEffect(() => {
        setLocalIndexNotes(indexNotes)
    }, [indexNotes])

    useEffect(() => {
        setLocalNoteIndices(noteIndices)
    }, [noteIndices])

    const handleNoteClick = ({ day, noteid, note }) => {
        setLocalNote({
            day,
            noteid,
            note
        })
        setNoteModal(true)
    }

    const handleSaveNote = (note, noteid, day) => {
        updateWeek({
            note, 
            noteid, 
            day,
            type: 'UPDATE_NOTE',
            weekid: localWeek.weekid
        })
        setNoteModal(false)
    }

    return (
        <div className="table-container">
            <table>

                <thead>
                    <tr className="header-row">
                        {localWeek && Object.keys(localWeek.days).map((day) => {
                            return <th key={day}>{day}</th>
                        })}
                    </tr>
                </thead>

                <tbody>
                    {localWeek && localNotes && localIndexNotes && localNoteIndices && 
                        Object.keys(localWeek.days.Friday).map((val, index) => {
                            return (
                                <tr 
                                    className="table-row" 
                                    key={index} 
                                    onMouseEnter={() => setDragIndex(index)} 
                                >
                                    <td 
                                        className="time-cell"  
                                        style={{"backgroundColor": dragIndex === index ? "#D3D3D3" : ''}}
                                    >
                                        {timeValues()[index]}
                                    </td>

                                    {Object.keys(localWeek.days).map((day) => {
                                        return (
                                            <td key={day} className="category-cell">
                                                <CategoryItem 
                                                    weekid={localWeek.weekid} 
                                                    day={day} 
                                                    index={index} 
                                                    category={localWeek.days[day][index].category}
                                                    activity={localWeek.days[day][index].activity}
                                                    setDragCategory={setDragCategory}
                                                    dragCategory={dragCategory}
                                                    dragActivity={dragActivity}
                                                    setDragActivity={setDragActivity}
                                                    localWeek={localWeek}
                                                    draggedCategories={draggedCategories}
                                                    setDraggedCategories={setDraggedCategories}
                                                    setDragIndex={setDragIndex}
                                    
                                                >
                                                </CategoryItem>
                                                <Note
                                                    onClick={handleNoteClick}
                                                    day={day}
                                                    noteid={localIndexNotes[day][index] && localIndexNotes[day][index]}
                                                    note={localIndexNotes[day][index] || localIndexNotes[day][index] === '' ? localNotes[day][localIndexNotes[day][index]] : false}
                                                    noteMultiplier={(localIndexNotes[day][index] && localNoteIndices[day][localIndexNotes[day][index]]) ? Object.values(localNoteIndices[day][localIndexNotes[day][index]]).length : 1} 
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                    })}
                </tbody>
            </table>
              {/* <button 
                onClick={() => randomThunk()}>
                    Press me
            </button> */}
            {noteModal ? 
                <NoteModal 
                    saveNote={handleSaveNote} 
                    closeModal={() => setNoteModal(false)} 
                    note={localNote.note}
                    day={localNote.day}
                    noteid={localNote.noteid}
                /> 
            : 
                null
            }
        </div>
    )
}

export default MainDashboardTable