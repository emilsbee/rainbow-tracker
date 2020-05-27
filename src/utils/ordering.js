export const orderByDays = (data) => {
    const weekExample = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var daysObj = {}
    // Object.keys(data).forEach((day, index) => {
    //     daysObj[weekExample[index]] = data[weekExample[index]]
    // })
    for (var i in Object.keys(data)) {
        daysObj[weekExample[i]] = data[weekExample[i]]
    }
    return daysObj
} 