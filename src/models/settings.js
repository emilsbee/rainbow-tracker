// External imports
import { thunk, action } from "easy-peasy"


// Internal imports
import database from '../components/firebase/firebase'
import { store } from '../index'
import { getRandomColor } from './utils/settings_utils'


const settingsModel = {
    activitySettings: {
        act1: {
            categoryid: 'cat1',
            short: 'co',
            long: 'cleaning and organising'
        },
        act2: {
            categoryid: 'cat1',
            short: 't',
            long: 'traveling'
        },
        act3: {
            categoryid: 'cat1',
            short: 'd',
            long: 'driving'
        },
        act4: {
            categoryid: 'cat2',
            short: 'e',
            long: 'exercise'
        },
        act5: {
            categoryid: 'cat2',
            short: 'm',
            long: 'movies'
        },
        act6: {
            categoryid: 'cat2',
            short: 'r',
            long: 'reading'
        },
        act7: {
            categoryid: 'cat3',
            short: 'o',
            long: 'other'
        },
        act8: {
            categoryid: 'cat3',
            short: 'pr',
            long: 'programming'
        },
        act9: {
            categoryid: 'cat3',
            short: 'r',
            long: 'reading'
        },
    },
    categorySettings: {
        cat1: {
            category: 'Category 1',
            color: "#E9B872"
        },
        cat2: {
            category: 'Category 2',
            color: "#BBBE64"
        },
        cat3: {
            category: 'Category 3',
            color: "#a63d40"
        }
    }
}


export default settingsModel