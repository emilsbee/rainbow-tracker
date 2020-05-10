export const timeValues = () => {
    const n = ['00', '15', '30', '45']
    const m = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11','12',
                '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    let timeSlots = []

    for (const [i, iValue] of m.entries()) {
        for (const [j, jValue] of n.entries()) {
            timeSlots.push(`${iValue}:${jValue}`)
        }
    }
    
    return timeSlots
}