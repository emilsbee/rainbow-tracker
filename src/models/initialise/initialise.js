// External imports
import { thunk } from "easy-peasy"
import moment from 'moment'

// Internal imports
import database from '../../components/firebase/firebase'
import { store } from '../../index'
import { createBaseData, createWeekData } from './helpers'


const initialiseModel = {
    initialiseUser: thunk(async (actions, payload) => {
        // Store actions
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        const setActivitySettings = store.getActions().settings.setActivitySettings
        const setCategorySettings = store.getActions().settings.setCategorySettings
        const setDate = store.getActions().settings.setDate

        // Store state
        const uid = store.getState().auth.uid
        
        // Checks the firebase init property 
        const isInitLaunch = await database.ref(`users/${uid}/init`).once('value')
        
        // Gets current weeknr and year
        const weekNr = moment().isoWeek()
        const year = moment().year()

        if (isInitLaunch.val() === null) { // If initial launch
            let {activitySettings, categorySettings} = createBaseData()
        
            const {updates, notes, categories} = createWeekData('CURRENT', uid)

            updates[`users/${uid}/activitySettings`] = activitySettings
            updates[`users/${uid}/categorySettings`] = categorySettings
            updates[`users/${uid}/init`] = true
            
            await database.ref().update(updates)

            setNotes({notes})
            setCategories({categories})
            setActivitySettings({activitySettings})
            setCategorySettings({categorySettings})
        } else { // If not initial launch
            
            const currentWeekid = await database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value') // Fetches weekid of current week
            
            if (currentWeekid.val() === null) { // If current week is not yet created
                const {updates, notes, categories} = createWeekData('CURRENT', uid) 
                
                await database.ref().update(updates)
                
                const activitySettings = await database.ref(`users/${uid}/activitySettings`).once('value')
                const categorySettings = await database.ref(`users/${uid}/categorySettings`).once('value')
                
                setNotes({notes})
                setCategories({categories})
                setActivitySettings({activitySettings: activitySettings.val()})
                setCategorySettings({categorySettings: categorySettings.val()})
                
            } else { // If current week does exist already
                
                const notes = await database.ref(`users/${uid}/notes/${currentWeekid.val()}`).once('value')
                const categories = await database.ref(`users/${uid}/categories/${currentWeekid.val()}`).once('value')
                const activitySettings = await database.ref(`users/${uid}/activitySettings`).once('value')
                const categorySettings = await database.ref(`users/${uid}/categorySettings`).once('value')
                
                setNotes({notes: notes.val()})
                setCategories({categories: categories.val()})
                setActivitySettings({activitySettings: activitySettings.val()})
                setCategorySettings({categorySettings: categorySettings.val()})
            }
            
        }

        setDate({date: {weekNr, year}})
    })
}


export default initialiseModel