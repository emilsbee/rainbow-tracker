import * as i from 'types';
import * as React from 'react';

import { Day } from './Day';
import { TimeCells } from './TimeCell';
import { DashTableContainer, DashTableWrapper } from './styled';

export const MainDashboardTable: React.FC<MainDashboardTableProps> = ({
  categories,
  notes,
  categoryTypeData,
}) => (
  <DashTableWrapper>
    <DashTableContainer>
      <TimeCells />
      {categories && notes && categoryTypeData && categories.map((dayArr, dayIndex) => {
        return (
          <Day
            key={dayArr[0].weekDay}
            categories={dayArr}
            notes={notes[dayIndex]}
            weekDay={dayIndex}
            categoryTypeData={categoryTypeData}
          />
        );
      })}
    </DashTableContainer>
  </DashTableWrapper>
);

type MainDashboardTableProps = {
  categories?: i.Category[][];
  notes?: i.Note[][];
  categoryTypeData?: i.CategoryTypesFull;
};
