import moment from 'moment'

export const setCurrentDate = (setDate) => {
    setDate({week: moment().isoWeek(), year: moment().year(), month: moment().month() })
}

export const goBack = (view, date, setDate) => {
    if (view === "week") {
        setDate(goBackWeek(date))
    } else if (view === "month") {
        setDate(goBackMonth(date))
    } else {
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
    if (view === "week") {
        setDate(goForwardWeek(date))
    } else if (view === "month") {
        setDate(goForwardMonth(date))
    } else {
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