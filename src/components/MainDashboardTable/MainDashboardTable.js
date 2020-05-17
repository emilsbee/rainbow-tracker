// External imports
import React, { useEffect, useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'

// Internal imports 
import NoteModal from '../NoteModal/NoteModal'
import CategoryItem from '../CategoryItem/CategoryItem'
import Note from '../Note/Note'
import DragNote from '../DragNote/DragNote'
import {timeValues} from '../../utils/staticData'
import { orderByDays } from '../../utils/ordering'
import './main-dashboard-table.scss'

const MainDashboardTable  = ({ days, weekid, notes, indexNotes, noteIndices }) => {

    const randomThunk = useStoreActions(actions => actions.weeks.randomThunk)

    const updateWeek = useStoreActions(actions => actions.weeks.updateWeek)
    
    // For categories and activities
    const [localWeek, setLocalWeek] = useState(false)
    const [dragCategory, setDragCategory] = useState("")
    const [dragActivity, setDragActivity] = useState("")
    const [draggedCategories, setDraggedCategories] = useState([])
    const [dragIndex, setDragIndex] = useState('')
    
    // For notes 
    const [localNoteIndices, setLocalNoteIndices] = useState(false)
    const [localNotes, setLocalNotes] = useState(false)
    const [localIndexNotes, setLocalIndexNotes] = useState(false)
    const [noteModal, setNoteModal] = useState(false)
    const [localNote, setLocalNote] = useState('')
    const [draggedNoteIndex, setDraggedNoteIndex] = useState('')
    const [draggedNoteid, setDraggedNoteid] = useState('')
    const [draggedNoteDay, setDraggedNoteDay] = useState('')

    const [noteHeightOffset, setNoteHeightOffset] = useState('')
    const [noteTopOffset, setNoteTopOffset] = useState('')

    const [highestIndexDragNote, setHighestIndexDragNote] = useState('')
    const [lowestIndexDragNote, setLowestIndexDragNote] = useState('') 

    // For categories and activities
    useEffect(() => {
        var currentWeek = {}
        currentWeek["days"] = orderByDays(days)
        currentWeek["weekid"] = weekid
        setLocalWeek(currentWeek)
    }, [days])



    // For notes
    useEffect(() => {
        if (noteIndices) {
            setLocalNoteIndices(noteIndices)
        }
    }, [noteIndices])

    useEffect(() => {
        if (notes) {
            setLocalNotes(notes)
        }
    }, [notes])
   
    useEffect(() => {
        if (indexNotes) {
            setLocalIndexNotes(indexNotes)
        }
    }, [indexNotes])

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

    var ref = React.createRef()
    var dragNoteRef = React.createRef()

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
                    {localWeek && localNotes && localNoteIndices && localIndexNotes &&
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
                                                {(draggedNoteIndex === index) && (draggedNoteid === indexNotes[day][index]) && (draggedNoteDay === day) && 
                                                    <DragNote 
                                                        noteTopOffset={noteTopOffset}
                                                        noteHeightOffset={noteHeightOffset}
                                                        ref={dragNoteRef}
                                                        note={localNotes[day][indexNotes[day][index]]} 
                                                        draggedNoteIndex={draggedNoteIndex}
                                                        noteIndices={localNoteIndices}
                                                        day={day}
                                                        noteid={indexNotes[day][index]}
                                                        draggedNoteDay={draggedNoteDay}
                                                        highestIndexDragNote={highestIndexDragNote}
                                                        lowestIndexDragNote={lowestIndexDragNote}
                                                    />
                                                }
                                                
                                                <Note
                                                    noteTopOffset={noteTopOffset}
                                                    setNoteTopOffset={setNoteTopOffset}
                                                    ref={ref}
                                                    setNoteHeightOffset={setNoteHeightOffset}
                                                    // indexNotes[day][index] refers to noteid 
                                                    note={localNotes[day][localIndexNotes[day][index]]}
                                                    onClick={handleNoteClick}
                                                    allNoteIndices={localNoteIndices}
                                                    day={day}
                                                    noteid={localIndexNotes[day][index]}
                                                    index={index}
                                                    draggedNoteIndex={draggedNoteIndex}
                                                    setDraggedNoteIndex={setDraggedNoteIndex}
                                                    setNoteIndices={setLocalNoteIndices}
                                                    setDraggedNoteid={setDraggedNoteid}
                                                    draggedNoteid={draggedNoteid}
                                                    setDraggedNoteDay={setDraggedNoteDay}
                                                    draggedNoteDay={draggedNoteDay}
                                                    notes={localNotes}
                                                    setNotes={setLocalNotes}
                                                    setDragIndex={setDragIndex}

                                                    highestIndexDragNote={highestIndexDragNote}
                                                    setHighestIndexDragNote={setHighestIndexDragNote}
                                                    lowestIndexDragNote={lowestIndexDragNote}
                                                    setLowestIndexDragNote={setLowestIndexDragNote}
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                    })}
                </tbody>
            </table>
              {/* {<button 
                onClick={() => randomThunk()}>
                    Press me
            </button> }    */}
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