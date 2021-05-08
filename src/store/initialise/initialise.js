// External imports
import { thunk } from "easy-peasy"
import moment from 'moment'

// Internal imports
import database from '../../firebase/firebase'
import store from '../storeSetup'
import { createData } from './helpers'


const initialiseModel = {
    initialiseUser: thunk(async (actions, payload) => {
        // Payload
        const history = payload.history
        const renderApp = payload.renderApp

        // Store actions
        const setCategories = store.getActions().activities.setCategories
        const setNotes = store.getActions().notes.setNotes
        const setActivitySettings = store.getActions().settings.setActivitySettings
        const setCategorySettings = store.getActions().settings.setCategorySettings
        const setDate = store.getActions().settings.setDate
        const startCategoryListener = store.getActions().analytics.startCategoryListener


        // Store state
        const uid = store.getState().auth.uid

        // Other
        const weekNr = moment().isoWeek()
        // It is necessary to get the year from the current week because there can be a scenario when a week is the last week of a year
        // however the current year could already be a new year so it would show the last week of the next year.
        const year = moment().startOf("isoWeek")._d.getFullYear()
        database.ref(`users/${uid}/init`).once("value").then((hasData) => {

            if (hasData.val() === null) { // New acount

                const {weekid, notes, categories, activitySettings, categorySettings, analytics} = createData()

                const updates = {}
                updates[`users/${uid}/activitySettings`] = activitySettings
                updates[`users/${uid}/categorySettings`] = categorySettings
                updates[`users/${uid}/init`] = true
                updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid 
                updates[`users/${uid}/categories/${weekid}`] = categories
                updates[`users/${uid}/notes/${weekid}`] = notes
                updates[`users/${uid}/analytics/${weekid}`] = analytics

                database.ref().update(updates).then(() => {
                    setActivitySettings({activitySettings})
                    setCategorySettings({categorySettings})
                    setCategories({categories})
                    setNotes({notes})
                    setDate({date: {weekNr, year}})

                    renderApp()
                    if (history.location.pathname === '/') {
                        history.push(`/dashboard`)
                    }
                })

            } else { // Existing account

                database.ref(`users/${uid}/weekYearTable/${weekNr}_${year}`).once('value').then(async (currentWeek) => {

                    if (currentWeek.val() === null) { // Current week does not exists

                        const {weekid, notes, categories} = createData()

                        const activitySettings = await database.ref(`users/${uid}/activitySettings`).once('value')
                        const categorySettings = await database.ref(`users/${uid}/categorySettings`).once('value')

                        const updates = {}
                        updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid 
                        updates[`users/${uid}/categories/${weekid}`] = categories
                        updates[`users/${uid}/notes/${weekid}`] = notes

                        database.ref().update(updates).then(() => {
                            setActivitySettings({activitySettings})
                            setCategorySettings({categorySettings})
                            setCategories({categories})
                            setNotes({notes})
                            setDate({date: {weekNr, year}})

                            renderApp()
                            if (history.location.pathname === '/') {
                                history.push(`/dashboard`)
                            }
                            
                        })

                    } else { // Current week exists

                        const notes = await database.ref(`users/${uid}/notes/${currentWeek.val()}`).once('value')
                        const categories = await database.ref(`users/${uid}/categories/${currentWeek.val()}`).once('value')
                        const activitySettings = await database.ref(`users/${uid}/activitySettings`).once('value')
                        const categorySettings = await database.ref(`users/${uid}/categorySettings`).once('value')
                        
                        setNotes({notes: notes.val()})
                        setCategories({categories: categories.val()})
                        setActivitySettings({activitySettings: activitySettings.val()})
                        setCategorySettings({categorySettings: categorySettings.val()})
                        setDate({date: {weekNr, year}})
                        renderApp()
                        if (history.location.pathname === '/') {
                            history.push(`/dashboard`)
                        }

                    }
 
                })


            }

        })


        startCategoryListener()
    })
}


export default initialiseModel