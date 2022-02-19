import * as i from 'types';
import * as React from 'react';

import { timeValues } from 'services';

import Day from '../Day/Day/Day';
import './MainDashboardTable.scss';
import TimeCell from './TimeCell/TimeCell';

const  MainDashboardTable: React.FC<MainDashboardTableProps> = ({
  categories,
  notes,
  categoryTypeData,
}) => (
  <div id="main-dashboard-table__container">
    <TimeCell timeValues={timeValues} />
    {categories.map((dayArr, dayIndex) => {
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
  </div>
);

type MainDashboardTableProps = {
  categories: i.Category[][];
  notes: i.Note[][];
  categoryTypeData: i.CategoryTypesFull;
};

export default MainDashboardTable;
