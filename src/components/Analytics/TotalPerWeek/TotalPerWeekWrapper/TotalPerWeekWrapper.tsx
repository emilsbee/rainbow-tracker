// External imports
import React from 'react';

// Internal imports
import { DateTime } from 'luxon';
import { useStoreActions, useStoreState } from '../../../../store/hookSetup';
import TotalPerWeekDashboard from '../TotalPerWeekDashboard/TotalPerWeekDashboard';
import ToolBar from '../../../BasicComponents/ToolBar/ToolBar';
import Dropdown from '../../../BasicComponents/ToolBar/ToolBarItems/Dropdown/Dropdown';
import { formatWeeks, getWeekDropdownWeeks } from '../../TotalPerDay/TotalPerDayWrapper/helpers';
import { useKeyPress } from '../../../../hooks/useKeyPress';
import NoAnalyticsBanner from '../../BasicComponents/NoAnalyticsBanner/NoAnalyticsBanner';
import { isNewDateAvailable } from './helpers';

const TotalPerWeekWrapper = () => {
  // Store state
  const userid = useStoreState((state) => state.auth.uid);
  const currentDate = useStoreState((state) => state.settings.currentDate);
  const availableDates = useStoreState((state) => state.analytics.availableDates);

  // Store actions
  const setDate = useStoreActions((actions) => actions.settings.setDate);
  const fetchTotalPerWeek = useStoreActions((actions) => actions.analytics.fetchTotalPerWeek);
  const fetchAvailableDates = useStoreActions((actions) => actions.analytics.fetchAvailableDates);

  // Local state
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // Document key press listeners
  const arrowLeftPress = useKeyPress('ArrowLeft');
  const arrowRightPress = useKeyPress('ArrowRight');
  const cPress = useKeyPress('c');


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
        await changeWeek(DateTime.now().weekNumber, DateTime.now().startOf('week').year);
      }
    })();

  }, [arrowLeftPress, arrowRightPress, cPress]);

  React.useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        await fetchTotalPerWeek({ userid, weekNr: currentDate.weekNr, year: currentDate.year });
        await fetchAvailableDates({ userid });
        setError('');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const changeWeek = async (weekNr: number, year: number): Promise<void> => {
    setLoading(true);

    try {
      await fetchTotalPerWeek({ userid, weekNr, year });
      setError('');
    } catch (e: any) {
      setError(e.message);
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
        await fetchTotalPerWeek({ userid, weekNr: currentDate.weekNr, year: currentDate.year });
        setError('');
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
        setDate({ date: { weekNr, year } });
      }
    }
  };

  return (
    <>
      <ToolBar>
        <Dropdown
          label={'Year'}
          options={availableDates.flatMap((availableDate) => availableDate.year)}
          onSelect={(data) => changeYear(parseInt(data.toString()))}
          selected={currentDate.year}
        />
        <Dropdown
          label={'Week'}
          options={getWeekDropdownWeeks(availableDates, currentDate.year)}
          onSelect={(data) => changeWeek(parseInt(data.toString()), currentDate.year)}
          selected={currentDate.weekNr}
          text={formatWeeks(getWeekDropdownWeeks(availableDates, currentDate.year), currentDate.year)}
        />
      </ToolBar>

      {error ?
        <NoAnalyticsBanner message={error} />
        :
        <TotalPerWeekDashboard loading={loading} />
      }
    </>
  );
};

export default TotalPerWeekWrapper;
