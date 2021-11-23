// External imports
import React from "react";

// Internal imports
import "./activity-card-content.scss";
import Dropdown from "../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import ActivityTable from "../ActivityTable/ActivityTable";
import ActivityPieChart from "../ActivityPieChart/ActivityPieChart";

type ActivityCardContentProps = {
  totalCount: number
  categoryTypes: {
    categoryid: string
    count: number
    color: string
    name: string
  }[]
  activityTypes: {
    categoryid: string
    activityid: string
    long: string
    short: string
    count: number
  }[]
}

const ActivityCardContent:React.FC<ActivityCardContentProps> = ({ categoryTypes, activityTypes, totalCount }) => {

  const [pickedCategoryIndex, setPickedCategoryIndex] = React.useState(0);

  return (
    <>
      <div className={"analytics-activity-card-content__description"}>
        <p className={"analytics-activity-card-content__description-text"}>
                    For category
        </p>

        <Dropdown
          styleSelect={{ marginTop: 0, marginBottom: "10px" }}
          label={""}
          options={categoryTypes.flatMap((categoryType) => categoryType.name)}
          onSelect={(selected, selectedIndex) => setPickedCategoryIndex(selectedIndex)}
          selected={categoryTypes[pickedCategoryIndex].name}
        />
      </div>

      <ActivityTable
        color={categoryTypes[pickedCategoryIndex].color}
        categoryTypes={categoryTypes}
        activityTypes={activityTypes}
        pickedCategoryid={categoryTypes[pickedCategoryIndex].categoryid}
        totalCount={totalCount}
      />

      <ActivityPieChart
        color={categoryTypes[pickedCategoryIndex].color}
        activityTypes={activityTypes}
        pickedCategoryid={categoryTypes[pickedCategoryIndex].categoryid}
        totalCount={totalCount}
      />
    </>
  );
};

export default ActivityCardContent;
