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
    })
    
}


export default settingsModel