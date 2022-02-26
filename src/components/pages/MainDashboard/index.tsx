import * as React from 'react';

import { useGetWeek, useGetCategoryTypesFull } from 'queries';
import { useDate } from 'hooks';

import { ReactComponent as Loader } from '../../../../svgIcons/spinner.svg';
import MainDashboardTable from './MainDashboardTable/MainDashboardTable';
import MainDashboardNavBar from './MainDashboardNavBar/MainDashboardNavBar';
import { MainDashboardWrapper } from './styled';

export const MainDashboard: React.FC = () => {
  const { weekNr, year } = useDate();
  const { isLoading: weekLoading, data: weekData } = useGetWeek(weekNr, year);
  const { isLoading: categoryLoading, data: categoryTypeData } = useGetCategoryTypesFull();

  if (weekLoading || categoryLoading || !weekData || !categoryTypeData) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: '6rem', width: '6rem' }} />
      </div>
    );
  }

  return (
    <MainDashboardWrapper>
      <MainDashboardNavBar />
      <MainDashboardTable
        categories={weekData.categories}
        notes={weekData.notes}
        categoryTypeData={categoryTypeData}
      />
    </MainDashboardWrapper>
  );
};
