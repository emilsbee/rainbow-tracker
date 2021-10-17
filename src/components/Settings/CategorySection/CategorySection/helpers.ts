// Internal imports
import {CategoryType} from "../../../../store/settings/settings";

export const findCategoryForForm = (categoryTypes:CategoryType[], selectedCategoryid: string):CategoryType => {
    for (let i = 0; i < categoryTypes.length; i++) {
        if (categoryTypes[i].categoryid === selectedCategoryid) {
            return categoryTypes[i]
        }
    }

    return {categoryid: "", userid: "", color: "", name: "", archived: false}
}