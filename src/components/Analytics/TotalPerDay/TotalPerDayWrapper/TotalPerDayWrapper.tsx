// External imports
import React from "react";

// Internal imports
import { DateTime } from "luxon";
import { useStoreActions, useStoreState } from "../../../../store/hookSetup";
import TotalPerDayDashboard from "../TotalPerDayDashboard/TotalPerDayDashboard";
import ToolBar from "../../../BasicComponents/ToolBar/ToolBar";
import Dropdown from "../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown";
import { useKeyPress } from "../../../../hooks/useKeyPress";
import { isNewDateAvailable } from "../../TotalPerWeek/TotalPerWeekWrapper/helpers";
import { formatWeeks, getWeekDropdownWeeks } from "./helpers";

const TotalPerDayWrapper = () => {
  // Store actions
  const setDate = useStoreActions((actions) => actions.settings.setDate);
  const fetchTotalPerDay = useStoreActions((actions) => actions.analytics.fetchTotalPerDay);
  const fetchAvailableDates = useStoreActions((actions) => actions.analytics.fetchAvailableDates);
  const fetchCategoryTypesFull = useStoreActions((actions) => actions.settings.fetchCategoryTypesFull);

  // Store state
  const userid = useStoreState((state) => state.auth.uid);
  const currentDate = useStoreState((state) => state.settings.currentDate);
  const availableDates = useStoreState((state) => state.analytics.availableDates);
  const totalPerDay = useStoreState((state) => state.analytics.totalPerDay);

  // Local state
  const [loading, setLoading] = React.useState(true);

  // Document key press listeners
  const arrowLeftPress = useKeyPress("ArrowLeft");
  const arrowRightPress = useKeyPress("ArrowRight");
  const cPress = useKeyPress("c");

  React.useEffect(() => {

    (async function () {
      if (arrowLeftPress) {
        if (isNewDateAvailable(availableDates, currentDate.year, currentDate.weekNr - 1)) {
          await changeWeek(currentDate.weekNr - 1, currentDate.year);
        }
      } else if (arrowRightPress) {
        if (isNewDateAvailable(availableDates, currentDate.year, currentDate.weekNr + 1)) {
          await changeWeek(currentDate.weekNr + 1, currentDate.year);
        }
      } else if (cPress) {
        await changeWeek(DateTime.now().weekNumber, DateTime.now().startOf("week").year);
      }
    })();

  }, [arrowLeftPress, arrowRightPress, cPress]);

  React.useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        await fetchCategoryTypesFull({ userid });
        await fetchTotalPerDay({ userid, weekNr: currentDate.weekNr, year: currentDate.year });
        await fetchAvailableDates({ userid });
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);


  const changeWeek = async (weekNr: number, year: number): Promise<void> => {
    setLoading(true);

    try {
      await fetchTotalPerDay({ userid, weekNr, year });
    } catch (e: any) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setDate({ date: { weekNr, year } });
    }
  };

  const changeYear =  async (year: number): Promise<void> => {
    let weekNr = -1;

    // Finds the highest week for the year
    for (let i = 0; i < availableDates.length; i++) {
      if (availableDates[i].year === year) {
        weekNr = Math.max(...availableDates[i].weeks);
        break;
      }
    }

    if (weekNr !== -1) {
      setLoading(true);

      try {
        await fetchTotalPerDay({ userid, weekNr, year });
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setLoading(false);
        setDate({ date: { year, weekNr } });
      }
    }
  };

  return (
    <>
      <ToolBar>
        <Dropdown
          label={"Year"}
          options={availableDates.flatMap((availableDate) => availableDate.year)}
          onSelect={(data) => changeYear(parseInt(data.toString()))}
          selected={currentDate.year}
        />
        <Dropdown
          label={"Week"}
          options={getWeekDropdownWeeks(availableDates, currentDate.year)}
          onSelect={(data) => changeWeek(parseInt(data.toString()), currentDate.year)}
          selected={currentDate.weekNr}
          text={formatWeeks(getWeekDropdownWeeks(availableDates, currentDate.year), currentDate.year)}
        />

      </ToolBar>

      <TotalPerDayDashboard loading={loading} totalPerDay={totalPerDay} />
    </>
  );
};

export  default TotalPerDayWrapper;
