export const getCurrentYearWeekIds = (weekYearTable, year) => {
    const weekIdArr = []

    Object.keys(weekYearTable).forEach((weekYear) => {
        if (weekYear.toString().includes(year.toString())) {
            weekIdArr.push(weekYearTable[weekYear])
        }
    })

    return weekIdArr

}

