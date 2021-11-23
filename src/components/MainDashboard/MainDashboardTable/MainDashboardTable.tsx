import * as i from "types";
import React from "react";

import Day from "../Day/Day/Day";
import { timeValues } from "../../../utils/dataGenerators";
import "./MainDashboardTable.scss";
import { ReactComponent as Loader } from "../../../svgIcons/spinner.svg";
import TimeCell from "./TimeCell/TimeCell";

type MainDashboardTableProps = {
  categories: i.Category[][],
  notes: i.Note[][],
  loading:boolean
}

function MainDashboardTable({ categories, notes, loading }:MainDashboardTableProps) {

  if (loading) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: "6rem", width: "6rem" }} />
      </div>
    );
  }

  return (
    <div id="main-dashboard-table__container">

      <TimeCell timeValues={timeValues} />

      {categories.map((dayArr, dayIndex) => {
        return (
          <Day
            key={dayArr[0].weekDay}
            categories={dayArr}
            notes={notes[dayIndex]}
            weekDay={dayIndex}
          />
        );
      })}
    </div>
  );
}

export default MainDashboardTable;
