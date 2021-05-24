// External imports
import moment from 'moment'
import database from "../../firebase/firebase";
import {getWeekDateByWeekid} from "../settings/helpers";
import {DateTime} from "luxon";

// Internal imports

/**
 * Fetches the current week year table object for a given user.
 * @param uid The user id.
 * @return Promise That contains the week year table object.
 */
export const getWeekYearTable = (uid) => {
    return database.ref(`users/${uid}/weekYearTable`).once("value")
}

/**
 * Fetches the analytics object for a given user and a given year.
 * @param uid The user id.
 * @param year The year for which to fetch the analytics.
 * @param weekYearTable The week year table object.
 * @return weeks Array of {categories:{categoryid:number}, activities:{activityid:number}, weekid}
 */
export const getAnalytics = async (uid, year, weekYearTable) => {
    const weekids = getCurrentYearWeekIds(weekYearTable, year)
    let weeks = []

    try {
        for (let i = 0; i < weekids.length; i++) {
            let week = await database.ref(`users/${uid}/analytics/${weekids[i]}`).once("value")
            weeks.push({
                analytics: week.val(),
                weekid:weekids[i], weekNr: getWeekDateByWeekid(weekYearTable, weekids[i]).split("_")[0],
                year: getWeekDateByWeekid(weekYearTable, weekids[i]).split("_")[1]
            })
        }
    } catch (e) {
        console.error(e)
    }

    return weeks
}

/**
 * Finds week ids in the week year table for a given year.
 * @param weekYearTable The week year table object.
 * @param year The year for which to find week ids.
 * @returns weekids An array of weekids.
 */
export const getCurrentYearWeekIds = (weekYearTable, year) => {
    const weekIdArr = []

    Object.keys(weekYearTable).forEach((weekYear) => {
        if (weekYear.toString().includes(year.toString())) {
            weekIdArr.push(weekYearTable[weekYear])
        }
    })

    return weekIdArr
}

const monthTable = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

// A sort of pipeline function that converts analytics data fetched (categories)
// to a formatted object. This formatted object contains the amount of times times each activity and category has been selected 
// in all the weeks in a specific year. This data is then nicely formatted for each week, month and the whole year. This essentially
// makes it easy to display this data. This final object can be seen in more detail in roamresearch. Throughout the pipeline some other functions
// are occasionally called (all from this file) to make this function cleaner, although it ended up quite unclean. 
export const createSortedYearObject = (categories, year, weekYearTable) => {
    const formattedObj = {
        year,
        months: [],
        weeks: [],
        yearValues: {}
    }

    /* MONTHS LOGIC */
    const monthObjects = getWeekNrsInEachMonth(year); // Array of objects (months) that includes the month number and an array of week numbers in each month
    monthObjects.forEach(monthObj => {
        const formattedMonthObj = {categories: {}, activities: {}, monthNr: monthObj.month, monthName: monthTable[monthObj.month]}

        monthObj.weeks.forEach(weekNr => {
            let week = getSpecificWeek(weekYearTable, categories, weekNr, year)
            
            if (week && week.categories && week.activities) {
                addWeekDataToFormattedMonthObj(formattedMonthObj, week)
            }
        })
        formattedObj.months.push(formattedMonthObj)
    })
    /* MONTHS LOGIC */

    /* WEEKS LOGIC */
    const weeksInYear = DateTime.fromObject({weekYear:year}).weeksInWeekYear
    // Iterates over weeks in the year provided
    for (var i = 1; i <= weeksInYear; i++) {
        // The basic weekObj
        const formattedWeekObj = {weekNr: i, categories: {}, activities: {}, weekid: ""}

        let weekYear = `${i}_${year}` // This is the key format in weekYearTable 
        
        if (weekYearTable[weekYear]) { // If a week exists in the weekYearTable
            
            formattedWeekObj.weekid = weekYearTable[weekYear] // Adds the weekid to formattedWeekObj

            // Iterates over analytics categories (which are weeks) and if the current week (from the for loop) exists its categories and
            // activities are added to the formattedWeekObj
            categories.forEach(week => {
                if (week.weekid === formattedWeekObj.weekid) {
                    formattedWeekObj.activities = week.activities
                    formattedWeekObj.categories = week.categories
                }
            })
        }

        // Pushes the formatted weekObj to the main formattedObj
        // The formattedWeekObj can either be filled with an actual weekid, activities and categories 
        // or it can also has weekid an empty string and categories/activties empty objects.
        // It is important to have all the weeks in the year to be in the main formattedObj so the use can easily go through
        // the all weeks in the analytics tabs, even if a week does not exists. 
        formattedObj.weeks.push(formattedWeekObj)
    }
    /* WEEKS LOGIC */


    /* YEAR LOGIC */ 
    const yearObj = {activities: {}, categories: {}}
    categories.forEach(week => {

        if (week.activities && week.categories) {
            // Counts up activities from all weeks in categories
            Object.keys(week.activities).forEach(activityid => {

                if (yearObj.activities[activityid]) { // If the current activityid exists in the year obj

                    let activCount = yearObj.activities[activityid]
                    activCount += week.activities[activityid]
                    yearObj.activities[activityid] = activCount

                } else { // If the current activiyid does not exist in the year obj

                    yearObj.activities[activityid] = week.activities[activityid]

                }

            })

            // Counts up categories from all weeks in categories
            Object.keys(week.categories).forEach(categoryid => {

                if (yearObj.categories[categoryid]) { // If the current categoryid exists in the year obj

                    let categCount = yearObj.categories[categoryid]
                    categCount += week.categories[categoryid]
                    yearObj.categories[categoryid] = categCount

                } else { // If the current categoryid does not exist in the year obj

                    yearObj.categories[categoryid] = week.categories[categoryid]

                }

            })
        }
    })
    formattedObj.yearValues = yearObj
    /* YEAR LOGIC */ 
    
    return formattedObj
}


// Adds data from a week (category and activity counts) to a formattedMonthObj
const addWeekDataToFormattedMonthObj = (formattedMonthObj, week) => {
    
    // Increment the category count
    Object.keys(week.categories).forEach(categoryid => {

        if (!formattedMonthObj.categories[categoryid]) { // If the monthObj categories doesn't contain the category
            formattedMonthObj.categories[categoryid] = week.categories[categoryid]
        } else { // If the monthObj categories has the category
            let categCount = formattedMonthObj.categories[categoryid]
            categCount += week.categories[categoryid]
            formattedMonthObj.categories[categoryid] = categCount
        }
    })

    // Increment the activity count
    Object.keys(week.activities).forEach(activityid => {

        if (!formattedMonthObj.activities[activityid]) { // If the monthObj activities doesn't contain the activity
        formattedMonthObj.activities[activityid] = week.activities[activityid]
        } else { // If the monthObj activities has the category
            let activCount = formattedMonthObj.activities[activityid]
            activCount += week.activities[activityid]
            formattedMonthObj.activities[activityid] = activCount
        }
    })
    return formattedMonthObj
}


// Finds the a week specified by week number and year in the categories. 
// If found returns the week otherwise returns false
const getSpecificWeek = (weekYearTable, categories, weekNr, year) => {
    const weekid = weekYearTable[`${weekNr}_${year}`]
    let weekFound;
    if (weekid) { 
        categories.forEach(week => {
            if (week.weekid === weekid) {
                weekFound = week
            }
        })
        return weekFound
    } else return false
}  


/**
 * Returns information about week numbers in each month for a given year.
 * @param year The year.
 * @return {{month:number, weeks:number[]}[]} The information
 */
const getWeekNrsInEachMonth = (year):{month:number, weeks:number[]}[] => {
    const finalArr = [] // The final array of month objects

    const months = [1,2,3,4,5,6,7,8,9,10,11,12]
    months.forEach(month => { // Iterates through the months
        // This method of finding week numbers in a month is taken from stackoverflow: https://stackoverflow.com/questions/43603604/how-to-get-week-numbers-of-current-month-in-moment-js/43611388
        const firstDayOfMonth = moment(`${year}-${month}`, 'YYYY-MM-DD');
        const numOfDays = firstDayOfMonth.daysInMonth();
        let weeks = new Set();

        for(let i = 0; i < numOfDays; i++){
            const currentDay = moment(firstDayOfMonth, 'YYYY-MM-DD').add(i, 'days');

            weeks.add(currentDay.isoWeek());
        }

        finalArr.push({
            month,
            weeks: Array.from(weeks)
        }) 
    })
    return finalArr
}
 