// External imports
import React from "react"

// Internal imports
import "./total-per-week-activities-wrapper.scss"
import TotalPerWeekActivitiesPieChart from "../TotalPerWeekActivitiesPieChart/TotalPerWeekActivitiesPieChart";
import Dropdown from "../../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import TotalPerWeekActivitiesTable from "../TotalPerWeekActivitiesTable/TotalPerWeekActivitiesTable";
import {TotalPerWeek} from "../../../../../store/analytics";

type TotalPerWeekActivitiesWrapperProps = {
    totalPerWeek: TotalPerWeek
    totalCount: number
}

const TotalPerWeekActivitiesWrapper = ({totalPerWeek, totalCount}: TotalPerWeekActivitiesWrapperProps) => {

    const [pickedCategoryIndex, setPickedCategoryIndex] = React.useState(0)

    return (
        <>
            <div className={"total-per-week-activities-wrapper__description-container"}>
                <p className={"total-per-week-activities-wrapper__description-text"}>
                    For category
                </p>

                <Dropdown
                    styleSelect={{marginTop: 0, marginBottom: "10px"}}
                    label={""}
                    options={totalPerWeek.categoryTypes.flatMap(categoryType => categoryType.name)}
                    onSelect={(selected, selectedIndex) => setPickedCategoryIndex(selectedIndex)}
                    selected={totalPerWeek.categoryTypes[pickedCategoryIndex].name}
                />
            </div>

            <TotalPerWeekActivitiesTable
                color={totalPerWeek.categoryTypes[pickedCategoryIndex].color}
                totalPerWeek={totalPerWeek}
                pickedCategoryid={totalPerWeek.categoryTypes[pickedCategoryIndex].categoryid}
                totalCount={totalCount}
            />

            <TotalPerWeekActivitiesPieChart
                color={totalPerWeek.categoryTypes[pickedCategoryIndex].color}
                totalPerWeek={totalPerWeek} pickedCategoryid={totalPerWeek.categoryTypes[pickedCategoryIndex].categoryid}
            />
        </>
    )
}

export default TotalPerWeekActivitiesWrapper