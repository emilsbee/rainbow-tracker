import * as React from 'react';

import { timeValues } from 'services';
import { Text } from 'common/typography';

import { useStoreState } from '../../../../../store/hookSetup';
import { TimeCellsContainer, TimeCell } from './styled';

export const TimeCells: React.FC = () => {
  const timeHoverIndex = useStoreState((state) => state.settings.timeHoverIndex);

  return (
    <TimeCellsContainer>
      {timeValues().map((timeVal, index) => {
        return (
          <TimeCell key={timeVal} active={timeHoverIndex === index}>
            <Text size={14}>
              {timeVal}
            </Text>
          </TimeCell>
        );
      })}
    </TimeCellsContainer>
  );
};
