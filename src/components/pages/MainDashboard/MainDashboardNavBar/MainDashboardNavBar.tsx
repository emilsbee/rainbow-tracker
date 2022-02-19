import React from 'react';

import { useKeyPress, useDate, useDateActions } from 'hooks';

import './MainDashboardNavBar.scss';
import { ReactComponent as BackArrow } from '../../../../svgIcons/back.svg';
import { ReactComponent as NextArrow } from '../../../../svgIcons/next.svg';

const MainDashboardNavBar = () => {
  const {  weekNr, year, realWeekNr, realYear } = useDate();
  const { setNextWeek, setPreviousWeek, setRealWeek } = useDateActions();

  const arrowLeftPress = useKeyPress('ArrowLeft');
  const arrowRightPress = useKeyPress('ArrowRight');
  const cPress = useKeyPress('c');

  React.useEffect(() => {
    if (arrowLeftPress) {
      setPreviousWeek();
    } else if (arrowRightPress) {
      setNextWeek();
    } else if (cPress) {
      setRealWeek();
    }

  }, [arrowLeftPress, arrowRightPress, cPress]);

  return (
    <div id="main-dashboard-nav-container">
      <div id="main-dashboard-nav-back-to-current-container">
        {!(realWeekNr === weekNr && realYear === year) &&
          <button
            id="main-dashboard-nav-back-to-current"
            onClick={() => setRealWeek()}
          >
              To current week
          </button>
        }
      </div>

      <div id="main-dashboard-nav-central-container">
        <BackArrow onClick={() => setPreviousWeek()} id="main-dashboard-week-change-button" />
        <h2 id="main-dashboard-nav-banner">{year},</h2>
        <h2 id="main-dashboard-nav-banner">week {weekNr}</h2>
        <NextArrow onClick={() => setNextWeek()} id="main-dashboard-week-change-button" />
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
