import {NoteType} from "../../../store/notes/notes";
import {CategoryType} from "../../../store/categories/categories";

export const createDayArrays = (items:NoteType[] | CategoryType[]):any=> {
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
