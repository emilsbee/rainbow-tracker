import { v4 as uuidv4 } from 'uuid';
import moment from 'moment'

export const createData = () => {
    const weekid = uuidv4() // Create an id for the new week
    const {notes, categories, analytics} = createBaseData()
    return {weekid, notes, categories, activitySettings, categorySettings, analytics}
}
 
export const createWeekData = (type, uid, weekNr, year) => {

    if (type === 'CURRENT') {
        weekNr = moment().isoWeek()
        year = moment().startOf("isoWeek")._d.getFullYear()
    } 

    const weekid = uuidv4() // Create an id for the new week
    const {categories, notes} = createBaseData() // Generates base data which is the notes and categories

    const updates = {} // Firebase updates object

    updates[`users/${uid}/weekYearTable/${weekNr}_${year}`] = weekid 
    updates[`users/${uid}/categories/${weekid}`] = categories
    updates[`users/${uid}/notes/${weekid}`] = notes
    
    return {updates, notes, categories, weekid}
}

export const createBaseData = () => {
    // Analytics object initialised
    const analytics = {
        categories: {
            
        }, 
        activities: {
            
        }
    } 

    // Initialise all categories from categorySettings to have count 0
    Object.keys(categorySettings).forEach(categid => {
        analytics["categories"][categid] = 0
    })

    // Initialise all activities from activitySettings to have count 0
    Object.keys(activitySettings).forEach(actid => {
        analytics["activities"][actid] = 0
    })    

    const notes = []
    let categories = []
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]    
    days.forEach((day, index) => {
        for (var i = 1; i < 97; i++) {
            notes.push({
                day,
                position: i,
                note:'',
                stackid: uuidv4(),
            })
            categories.push({
                day,
                position: i,
                activityid: '',
                categoryid: ''
            })
        }
    })

    return {notes, categories, analytics}
}

const activitySettings = {
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
    act10: {
        categoryid: 'cat3',
        short: 'ss',
        long: 'self-study'
    },
    act11: {
        categoryid: 'cat3',
        short: 'sw',
        long: 'self-work'
    },
}

const categorySettings = {
    cat1: {
        category: 'havetos',
        color: "#E9B872"
    },
    cat2: {
        category: 'leisure',
        color: "#BBBE64"
    },
    cat3: {
        category: 'work',
        color: "#a63d40"
    },
    cat4: {
        category: 'sleep',
        color: "#6494AA"
    }
}