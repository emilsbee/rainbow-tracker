import * as React from 'react';

import { useGetWeek, useGetCategoryTypesFull } from 'queries';

import './MainDashboardWrapper.scss';
import { ReactComponent as Loader } from '../../../svgIcons/spinner.svg';
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable';
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar';
import { useStoreState } from '../../../store/hookSetup';

const MainDashboardWrapper = () => {
  const currentDate = useStoreState((state) => state.settings.currentDate);
  const { isLoading: weekLoading, data: weekData } = useGetWeek(currentDate.weekNr, currentDate.year);
  const { isLoading: categoryLoading, data: categoryTypeData } = useGetCategoryTypesFull();

  if (weekLoading || categoryLoading || !weekData || !categoryTypeData) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: '6rem', width: '6rem' }} />
      </div>
    );
  }

  return (
    <div id="main-dash-wrapper">
      <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year} />
      <MainDashboardTable
        categories={weekData.categories}
        notes={weekData.notes}
        loading={weekLoading || categoryLoading}
        categoryTypeData={categoryTypeData}
      />
    </div>
  );
};

export default MainDashboardWrapper;
