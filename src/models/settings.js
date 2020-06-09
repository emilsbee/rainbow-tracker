// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'
import { getRandomColor } from './utils/settings_utils'


const settingsModel = {
    activitySettings: false,
    categorySettings: false,
    startSettingsListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        var activitySettingsRef = database.ref(`users/${uid}/activityConfigs`)
        activitySettingsRef.on('value', function(snapshot) {
            
            actions.setSettings({type: 'ACTIVITY', activitySettings: snapshot.val()})
        })

        var categorySettingsRef = database.ref(`users/${uid}/categoryConfigs`)
        categorySettingsRef.on('value', function(snapshot) {
            actions.setSettings({type: 'CATEGORY', categorySettings: snapshot.val()})
        })
    }),
    stopSettingsListener: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        database.ref(`users/${uid}/activityConfigs`).off()
        database.ref(`users/${uid}/categoryConfigs`).off()
    }),
    setSettings: action((state, payload) => {
        switch(payload.type) {
            case 'ACTIVITY':
                state.activitySettings = payload.activitySettings
                break;
            case 'CATEGORY':
                state.categorySettings = payload.categorySettings
                break;
            default:
                return
        }
    }),
    initialiseUserSettings: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        const hasSettings = await database.ref(`users/${uid}/categoryConfigs`).once('value')
        
        if(hasSettings.val()) {
            actions.startSettingsListener()
            return
        } else {
            var updates = {}

            
            const categories = ['havetos', 'leisure', 'work', 'sleep']
            const colors = ["#E9B872","#BBBE64", "#a63d40", "#6494AA"]
            const activities = [{
                co: 'cleaning and organising',
                d: 'driving',
                t: 'traveling'
            },{
                e: 'exercise',
                m: 'movies',
                r: 'reading'
            }, {
                o: 'other',
                pr: 'programming',
                r: 'reading',
                ss: 'self-study',
                sw: 'self-work'
            }]
            

            for (var i in categories) {
                var newCategoryKey = database.ref().child(`users/${uid}/categoryConfigs`).push().key
                updates[`users/${uid}/categoryConfigs/${newCategoryKey}/category`] = categories[i] 
                updates[`users/${uid}/categoryConfigs/${newCategoryKey}/color`] = colors[i]
                
                if (categories[i] === 'sleep') {
                        
                } else {
                    for (var j in Object.keys(activities[i])) {
                        var newActivityKey = database.ref().child(`users/${uid}/activityConfigs/${newCategoryKey}`).push().key
                        var newActivityObj = {
                            short: Object.keys(activities[i])[j],
                            long: activities[i][Object.keys(activities[i])[j]]
                        }
                        updates[`users/${uid}/activityConfigs/${newCategoryKey}/${newActivityKey}`] = newActivityObj
                    }  
                }
            }

            

            
            database.ref().update(updates, function(error) {
                actions.startSettingsListener()
            })
        }
    }),
    editCategory: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid

        
        var updates = {}

        switch (payload.type) {
            case 'ADD':
                const randomColor = getRandomColor()
                var newCatObj = {
                    color: randomColor,
                    category: payload.category
                }
                var newCategoryKey = database.ref().child(`users/${uid}/categoryConfigs`).push().key
                updates[`users/${uid}/categoryConfigs/${newCategoryKey}`] = newCatObj
                break;
            case 'UPDATE': 
                updates[`users/${uid}/categoryConfigs/${payload.categoryid}`] = payload.categoryObj
                break;
            case 'REMOVE':
                updates[`users/${uid}/categoryConfigs/${payload.categoryid}`] = null
                updates[`users/${uid}/activityConfigs/${payload.categoryid}`] = null
                break;
            default:
                return 
            }
            

        
        await database.ref().update(updates)
    }),
    editActivity: thunk(async (actions, payload) => {
        const uid = store.getState().auth.uid
        var updates = {}
        
        switch (payload.type) {
            case 'ADD': 
                var newActivityid = database.ref().child(`users/${uid}/activityConfigs/${payload.categoryid}`).push().key
                updates[`users/${uid}/activityConfigs/${payload.categoryid}/${newActivityid}`] = payload.activityObj
                break;
            case 'EDIT':

                updates[`users/${uid}/activityConfigs/${payload.categoryid}/${payload.activityid}`] = payload.activityObj
                break;
            case 'REMOVE':
                await database.ref(`users/${uid}/activityConfigs/${payload.categoryid}/${payload.activityid}`).set({})
                break;
            default:
                return
        }
        await database.ref().update(updates)
    })
    
}


export default settingsModel