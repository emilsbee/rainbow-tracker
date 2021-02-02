// External imports
import moment from 'moment'

// Internal imports
import {VIEW_WEEK, VIEW_MONTH, VIEW_YEAR} from '../constants/constants'

/**
 * Gets the correct week, month or just the year from categories and 
 * returns the categories/activities of it. 
 * @param {*} view The view chosen by the user in AnalyticsDashboardNavBar
 * @param {*} date The date object contains weekNr, month (0-11), year
 * @param {*} categories The object that contains a whole year worth of category/activity data nicely formatted in weeks, months and year values.
 * @returns The correct category/activity data depending on the view and date.
 */
export const getDataToDisplay = (view, date, categories) => {
    
    let data = null
    if (Object.keys(categories).length > 0) {
        if (view === VIEW_WEEK) {
            
            for (var i = 0; i < categories.weeks.length; i++) {
                if (categories.weeks[i].weekNr === date.week) {
                    data = categories.weeks[i]
                    break
                }
            }

        } else if (view === VIEW_MONTH) {

            for (var j = 0; j < categories.months.length; j++) {
                if (categories.months[j].monthNr ===  date.month+1) {
                    data = categories.months[j]
                    break
                }
            }

        } else if (view === VIEW_YEAR) {
            data = {
                categories: categories.yearValues.categories,
                activities: categories.yearValues.activities
            }
        }
    }
    return data
}

export const setCurrentDate = (setDate) => {
    setDate({week: moment().isoWeek(), year: moment().year(), month: moment().month() })
}

export const goBack = (view, date, setDate) => {
    if (view === VIEW_WEEK) {
        setDate(goBackWeek(date))
    } else if (view === VIEW_MONTH) {
        setDate(goBackMonth(date))
    } else if (view === VIEW_YEAR) {
        setDate(goBackYear(date))
    }
}

const goBackWeek = (date) => {
    let weekNr = date.week - 1 // Determines what the week number would be if you were to just go one week back

    if (weekNr === 0) { // If the potential previous week number would be 0, it means that you're going back  to the previous year
        return {year: date.year-1, week: moment().isoWeeksInYear(date.year-1), month: 11}
    } else {
        let weekNrsInCurrentMonth = getWeeksInCurrentMonth(date.year, date.month+1)
        
        if (weekNrsInCurrentMonth.has(weekNr)) { // If going back a week doesn't change the month
            return {year: date.year, week: weekNr, month: date.month}
        } else { // If going back a week changes the month to the previous one
            return {year: date.year, week: weekNr, month: date.month-1}
        }
    }

}

const goBackMonth = (date) => {
    let monthNr = date.month - 1 // Determines what the month number would be if you were to go back a month

    if (monthNr < 0) { // If going back a month changes the year
        return {year: date.year-1, week: moment().isoWeeksInYear(date.year-1), month: 11}
    } else { // If going back a month doesn't change the year
        return {year: date.year, week: getWeeksInCurrentMonth(date.year, monthNr+1).values().next().value, month: monthNr}
    }
}

const goBackYear = (date) => {
    return {year: date.year-1, week: date.week, month: date.month}
}

export const goForward = (view, date, setDate) => {
    if (view === VIEW_WEEK) {
        setDate(goForwardWeek(date))
    } else if (view === VIEW_MONTH) {
        setDate(goForwardMonth(date))
    } else if (view === VIEW_YEAR) {
        setDate(goForwardYear(date))
    }
}

const goForwardWeek = (date) => {
    let weekNr = date.week + 1

    if (weekNr > moment().isoWeeksInYear(date.year)) { // If going forward a week changes to next year
        return {year: date.year+1, week: 1, month: 0}
    } else { // If going forward a week doesn't change the year
        let weekNrsInCurrentMonth = getWeeksInCurrentMonth(date.year, date.month+1)

        if (weekNrsInCurrentMonth.has(weekNr) && date.month+1 <= 11) { // If going forward a week changes the month
            return {year: date.year, week: weekNr, month: date.month+1}
        } else { // If going forward a week doesn't change the month
            return {year: date.year, week: weekNr, month: date.month}
        }
        
    }
}

const goForwardMonth = (date) => {
    let monthNr = date.month + 1 // Determines what the month number would be if you were to go forward a month

    if (monthNr > 11) { // If going forward a month changes the year
        return {year: date.year+1, week: 1, month: 0}
    } else { // If going forward a month doesn't change the year
        return {year: date.year, week: getWeeksInCurrentMonth(date.year, monthNr+1).values().next().value, month: monthNr}
    }
}

const goForwardYear = (date) => {
    return {year: date.year+1, week: date.week, month: date.month}
}

const getWeeksInCurrentMonth = (year, month) => {
    // This method of finding week numbers in a month is taken from stackoverflow: https://stackoverflow.com/questions/43603604/how-to-get-week-numbers-of-current-month-in-moment-js/43611388
    const firstDayOfMonth = moment(`${year}-${month}`, 'YYYY-MM-DD');
    const numOfDays = firstDayOfMonth.daysInMonth();
    let weeks = new Set();

    for(let i = 0; i < numOfDays; i++){
        const currentDay = moment(firstDayOfMonth, 'YYYY-MM-DD').add(i, 'days');

        weeks.add(currentDay.isoWeek());
    }
    return weeks
}

