export const orderByDays = (data) => {
    const weekExample = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var daysObj = {}
    Object.keys(data).forEach((day, index) => {
        daysObj[weekExample[index]] = data[day]
    })
    return daysObj
} 