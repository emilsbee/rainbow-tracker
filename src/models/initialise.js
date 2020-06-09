// External imports
import { thunk } from "easy-peasy"
import moment from 'moment'

// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'
import { indices, days } from '../utils/staticData'
import { categories, colors, activities } from './utils/initialise_utils'


const initialiseModel = {
    initialiseUser: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const hasData = await database.ref(`users/${uid}/categoryConfigs`).once('value')
        
        if (hasData.val() === null) {
            var updates = {}

            for (var i in categories) {
                
                var newCategoryKey = await database.ref(`users/${uid}/categoryConfigs`).push().key
                updates[`users/${uid}/categoryConfigs/${newCategoryKey}/category`] = categories[i] 
                updates[`users/${uid}/categoryConfigs/${newCategoryKey}/color`] = colors[i]
                
                if (categories[i] === 'sleep') {
                        
                } else {
                    for (var j in Object.keys(activities[i])) {
                        var newActivityKey = database.ref(`users/${uid}/activityConfigs/${newCategoryKey}`).push().key
                        var newActivityObj = {
                            short: Object.keys(activities[i])[j],
                            long: activities[i][Object.keys(activities[i])[j]]
                        }
                        updates[`users/${uid}/activityConfigs/${newCategoryKey}/${newActivityKey}`] = newActivityObj
                    }  
                }
            }

            const weekNr = moment().isoWeek()
            const year = moment().year()

            const weekid = await database.ref(`users/${uid}/weeks`).push().key
            updates[`users/${uid}/weeks/${weekid}/weekNr`] = weekNr
            updates[`users/${uid}/weeks/${weekid}/year`] = year
            updates[`users/${uid}/weeks/${weekid}/yearWeekNr`] = `${year}_${weekNr}`

            updates[`users/${uid}/years/${year}`] = true
            updates[`users/${uid}/yearWeeks/${year}/${weekNr}`] = weekid
            updates[`users/${uid}/yearWeekNumbers/${year}_${weekNr}`] = weekid

            for (var day in days) {
                for (var p in indices) {
                    var newNoteKey = database.ref(`users/${uid}/notes/${weekid}/${days[day]}`).push().key
                    updates[`users/${uid}/notes/${weekid}/${days[day]}/${newNoteKey}`] = ""
                    updates[`users/${uid}/indexNotes/${weekid}/${days[day]}/${indices[p]}`] = newNoteKey
                    var noteIndexObj = {}
                    noteIndexObj[indices[p]] = true
                    updates[`users/${uid}/noteIndices/${weekid}/${days[day]}/${newNoteKey}`] = noteIndexObj
                    updates[`users/${uid}/weeks/${weekid}/days/${days[day]}/${indices[p]}`] = {activity: '', category: ''}
                }
            }
    
            return await database.ref().update(updates)
        } else {
            return 
        }
    })
}


export default initialiseModel