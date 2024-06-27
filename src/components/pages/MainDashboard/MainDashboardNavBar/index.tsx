import * as React from 'react';
import { DateTime } from 'luxon';

import { useKeyPress, useDate, useDateActions } from 'hooks';
import { Button, Text } from 'common';

import {
  NavContainer, WeekSwitchContainer, StyledBackArrow,
  StyledNextArrow,
  WeekSwitchDate,
} from './styled';

export const MainDashboardNavBar: React.FC = () => {
  const {  weekNr, year } = useDate();
  const { setNextWeek, setPreviousWeek, setRealWeek, initQueryString } = useDateActions();

  const arrowLeftPress = useKeyPress('ArrowLeft');
  const arrowRightPress = useKeyPress('ArrowRight');
  const cPress = useKeyPress('c');

  React.useEffect(() => {
    initQueryString();
  }, []);

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
    <NavContainer>
      <WeekSwitchContainer>
        <Button
          iconOnly
          icon={<StyledBackArrow />}
          variant="tertiary"
          onClick={setPreviousWeek}
        />
        <WeekSwitchDate>
          <Text>
            {year}, &nbsp;
            {DateTime.fromObject({ weekNumber: weekNr, weekYear: year })
              .startOf('week')
              .toLocaleString({ day: '2-digit', month: 'short' })
            }
             &nbsp;-&nbsp;
            {DateTime.fromObject({ weekNumber: weekNr, weekYear: year })
              .endOf('week')
              .toLocaleString({ day: '2-digit', month: 'short' })
            }
          </Text>
        </WeekSwitchDate>
        <Button
          iconOnly
          icon={<StyledNextArrow />}
          variant="tertiary"
          onClick={setNextWeek}
        />
      </WeekSwitchContainer>

      <Button onClick={setRealWeek}>Current week</Button>
    </NavContainer>
  );
};
