import * as i from "types";
import React from "react";

import "./total-per-day-dashboard.scss";
import { ReactComponent as Loader } from "../../../../svgIcons/spinner.svg";
import TotalPerDayCategoriesChart from "../TotalPerDayCategoriesChart/TotalPerDayCategoriesChart";
import Card from "../../BasicComponents/Card/Card";
import CardTitle from "../../BasicComponents/Card/CardTitle/CardTitle";

type TotalPerDayDashboardProps = {
  loading: boolean,
  totalPerDay: i.TotalPerDay[]
}

const TotalPerDayDashboard = ({ loading, totalPerDay }: TotalPerDayDashboardProps) => {

  if (loading) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: "6rem", width: "6rem" }} />
      </div>
    );
  }

  return (
    <section className={"total-per-day"}>
      <Card>
        <CardTitle title={"Categories"} />

        <TotalPerDayCategoriesChart totalPerDay={totalPerDay} />
      </Card>
    </section>
  );
};

export default TotalPerDayDashboard;
