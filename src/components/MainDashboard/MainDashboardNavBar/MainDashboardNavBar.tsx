// External imports
import React from 'react';
import { DateTime } from 'luxon';

// Internal imports
import './MainDashboardNavBar.scss';
import { ReactComponent as BackArrow } from '../../../svgIcons/back.svg';
import { ReactComponent as NextArrow } from '../../../svgIcons/next.svg';
import { useStoreActions } from '../../../store/hookSetup';
import { useKeyPress } from '../../../hooks/useKeyPress';
import { getCurrentWeek, getNextWeek, getPreviousWeek } from './helpers';

type MainDashboardNavBarProps = {
  weekNr: number
  year: number
}

const MainDashboardNavBar = ({ weekNr, year }: MainDashboardNavBarProps) => {
  // Store actions
  const setDate = useStoreActions((actions) => actions.settings.setDate);

  const currentWeekNr = DateTime.now().weekNumber; // Current real life week number
  // It is important to get the year from the start of the current week because there can be a scenario when a week
  // is the last week of a year, however the current year could already be a new year so it would show the last week of the next year.
  const currentYear = DateTime.now().startOf('week').year; // Current real life year

  const arrowLeftPress = useKeyPress('ArrowLeft');
  const arrowRightPress = useKeyPress('ArrowRight');
  const cPress = useKeyPress('c');

  /**
     * Handles to current week button press.
     */
  const handleToCurrentWeek = () => {
    setDate({ date: getCurrentWeek() });
  };

  /**
     * Handles next week button press.
     */
  const handleNextWeek = () => {
    const nextWeek = getNextWeek(weekNr, year);
    setDate({ date: nextWeek });
  };

  /**
     * Handles previous week button press.
     */
  const handlePrevWeek = () => {
    const prevWeek = getPreviousWeek(weekNr, year);
    setDate({ date: prevWeek });
  };

  React.useEffect(() => {
    if (arrowLeftPress) {
      handlePrevWeek();
    } else if (arrowRightPress) {
      handleNextWeek();
    } else if (cPress) {
      handleToCurrentWeek();
    }

  }, [arrowLeftPress, arrowRightPress, cPress]);

  return (
    <div id="main-dashboard-nav-container">
      <div id="main-dashboard-nav-back-to-current-container">
        {!(currentWeekNr === weekNr && currentYear === year) &&
                        <button
                          id="main-dashboard-nav-back-to-current"
                          onClick={handleToCurrentWeek}
                        >
                            To current week
                        </button>
        }
      </div>

      <div id="main-dashboard-nav-central-container">
        <BackArrow onClick={handlePrevWeek} id="main-dashboard-week-change-button" />
        <h2 id="main-dashboard-nav-banner">{year},</h2>
        <h2 id="main-dashboard-nav-banner">week {weekNr}</h2>
        <NextArrow onClick={handleNextWeek} id="main-dashboard-week-change-button" />
      </div>

      <div
        style={{
          width: '33%',
          height: '60px',
        }}
      />

    </div>
  );
};

export default MainDashboardNavBar;
