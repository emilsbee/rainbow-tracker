import { action, thunk } from "easy-peasy";
import moment from 'moment'

import database from '../../components/firebase/firebase'
import { store } from '../../index'
import { getCurrentYearWeekIds } from './helpers'

const analyticsModel =  {
    weekYearTable: [],
    categories: [],

    setcategories: action((state, payload) => {
        state.categories = payload.categories
    }),
    setWeekYearTable: action((state, payload) => {
        state.weekYearTable = payload.weekYearTable
    }),
    
    getCategories: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid 
        const currentYear = moment().year()
        const weekYearTable = await database.ref(`users/${uid}/weekYearTable`).once('value')
        actions.setWeekYearTable({weekYearTable: weekYearTable.val()})

        const weekids = getCurrentYearWeekIds(weekYearTable.val(), currentYear)
        var weeks = []
        
        Promise.all(
            weekids.map(weekid => database.ref(`users/${uid}/analytics/${weekid}`).once('value'))
        ).then((data) => {
            data.forEach((week, index) => {
                weeks.push({...week.val(), weekid: weekids[index]})
            })
            actions.setcategories({categories: weeks})
        })
    }),

    startCategoryListener: thunk( async (actions, payload) => {
        const uid = store.getState().auth.uid 

        database.ref(`users/${uid}/categories/`).on('child_changed', (data) => {
            console.log(data.val())
        })
    })
}

export default analyticsModel