// Internal imports
import {AvailableMonth} from "../../../../store/analytics";

export const isNewMonthDateAvailable = (availableMonths: AvailableMonth[], year: number, month: number):boolean => {
    let isAvailable = false

    for (let i = 0; i < availableMonths.length; i++) {
        if (availableMonths[i].year === year && availableMonths[i].month === month) {
            isAvailable = true
        }
    }

    return isAvailable
}
