import * as i from 'types';
import * as React from 'react';

import Day from '../Day/Day/Day';
import { timeValues } from '../../../utils/dataGenerators';
import './MainDashboardTable.scss';
import TimeCell from './TimeCell/TimeCell';

type MainDashboardTableProps = {
  categories: i.Category[][];
  notes: i.Note[][];
  loading: boolean;
  categoryTypeData: i.CategoryTypesFull;
}

function MainDashboardTable({ categories, notes, loading, categoryTypeData }:MainDashboardTableProps) {

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
            categoryTypeData={categoryTypeData}
          />
        );
      })}
    </div>
  );
}

export default MainDashboardTable;
