import moment from 'moment'

export const getSpecificWeek = (weekYearTable, categories, weekNr, year) => {
    const weekid = weekYearTable[`${weekNr}_${year}`]
    let weekFound;

    if (weekid) { // If the week doesn't exist
        categories.forEach(week => {
            if (week.weekid === weekid) {
                weekFound = week
            }
        })
        return weekFound
    }
}   

export const getSpecificMonth = (weekYearTable, categories, year, monthNr) => {
    const firstDayOfMonth = moment(`${year}-${monthNr}`, 'YYYY-MM-DD');
    const numOfDays = firstDayOfMonth.daysInMonth();
    let weeks = new Set();

    for(let i = 0; i < numOfDays; i++){
        const currentDay = moment(firstDayOfMonth, 'YYYY-MM-DD').add(i, 'days');

        weeks.add(currentDay.isoWeek());
    }

    const monthWeekNrs = Array.from(weeks)
    
    const analyitics = {
        categories: {},
        activties: {},
        weekids: []
    }

    monthWeekNrs.forEach(weekNr => {

    })
}


