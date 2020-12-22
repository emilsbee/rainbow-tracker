export const createDayArrays = (items) => {
    // [["Monday"], ["Tuesday"], ["Wednesday"], ["Thursday"], ["Friday"], ["Saturday"], ["Sunday"]]
    let dayArrays = [[], [], [], [], [], [], []]
    items.forEach(item => {
        let dayArrayIndex;
        if (item.day.toLowerCase() === "monday") {
            dayArrayIndex = 0;
        } else if (item.day.toLowerCase() === "tuesday") {
            dayArrayIndex = 1;
        } else if (item.day.toLowerCase() === 'wednesday') {
            dayArrayIndex = 2
        } else if (item.day.toLowerCase() === "thursday") {
            dayArrayIndex = 3
        } else if (item.day.toLowerCase() === "friday") {
            dayArrayIndex = 4
        } else if (item.day.toLowerCase() === "saturday") {
            dayArrayIndex = 5
        } else if (item.day.toLowerCase() === "sunday") {
            dayArrayIndex = 6
        }
        dayArrays[dayArrayIndex].push(item)
    })
    return dayArrays
}

export const mapDayIndexToDay = (index) => {
    if (index === 0) {
        return "Monday"
    } else if (index === 1) {
        return "Tuesday"
    } else if (index === 2) {
        return "Wednesday" 
    } else if (index === 3) {
        return "Thursday" 
    } else if (index === 4) {
        return "Friday" 
    } else if (index === 5) {
        return "Saturday" 
    } else if (index === 6) {
        return "Sunday"
    }
}