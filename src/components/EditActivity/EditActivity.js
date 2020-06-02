// External imports
import React, { useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

// Internal imports 
import './edit-activity.scss'
import { ReactComponent as Trash } from './trash.svg'

const EditActivity  = ({ short, long, editActivity, categoryid, activityid, removeActivity }) => {

    const [localShort, setLocalShort] = useState(short)
    const [localLong, setLocalLong] = useState(long)

    const [hoverAct, setHoverAct] = useState(false)

    useEffect(() => {
        setLocalShort(short)
        setLocalLong(long)
    }, [short, long])

    const handleSubmit = (e) => {
        e.preventDefault()
        editActivity({
            type: 'EDIT',
            categoryid,
            activityid,
            activityObj: {
                short: localShort,
                long: localLong
            }
        })
    }

    const handleRemoveActivity = () => {
        removeActivity({
            type:'REMOVE',
            categoryid,
            activityid
        })
    }

    return (
        <div className="edit-activity-list-items">
            <form 
                className="edit-activity-list" 
                onBlur={handleSubmit} 
                onSubmit={handleSubmit} 
            >

                <input 
                    spellCheck="false" 
                    maxLength="2" 
                    value={localShort} 
                    onChange={(e) => setLocalShort(e.target.value)}
                    className="edit-category-activity-list-short"
                    style={{"verticalAlign":"text-top"}}
                />
                    <div  
                        onClick={() => setHoverAct(true)} 
                        className="edit-category-delete-activity"
                    >
                            :
                    </div>   
                <textarea 
                    maxLength="34" 
                    rows="2"
                    cols="60"
                    style={{"overflow":"hidden", "marginTop":"3px"}}
                    spellCheck="false" 
                    value={localLong}
                    onChange={(e) => setLocalLong(e.target.value)}
                    className="edit-category-activity-list-long"
                ></textarea>
            </form>
           {hoverAct && <Trash onClick={handleRemoveActivity} className="edit-activity-delete-floater" onMouseLeave={() => setHoverAct(false)}/>}
      
        </div>
    )
}

export default EditActivity