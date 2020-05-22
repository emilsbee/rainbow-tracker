// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'



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
            updates[`users/${uid}/activityConfigs`] = {
                havetos: {
                    co: true,
                    d: true,
                    t: true
                },
                leisure: {
                    e: true,
                    m: true,
                    r: true
                },
                work: {
                    ed: true,
                    o: true,
                    pr: true,
                    r: true,
                    ss: true,
                    sw: true
                }
            }
            updates[`users/${uid}/categoryConfigs`] = {
                havetos: "#E9B872",
                leisure: "#BBBE64",
                sleep: "#6494AA",
                work: "#a63d40"
            }
            
            database.ref().update(updates, function(error) {
                actions.startSettingsListener()
            })
        }
    })
    
}


export default settingsModel