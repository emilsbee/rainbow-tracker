import * as React from 'react';

import { useGetWeek, useGetCategoryTypesFull } from 'queries';
import { useDate } from 'hooks';
import { Page } from 'common/layout';

import { MainDashboardTable } from './MainDashboardTable';
import { MainDashboardNavBar } from './MainDashboardNavBar';
import { MainDashboardWrapper } from './styled';

export const MainDashboard: React.FC = () => {
  const { weekNr, year } = useDate();
  const { isLoading: weekLoading, data: weekData } = useGetWeek(weekNr, year);
  const { isLoading: categoryLoading, data: categoryTypeData } = useGetCategoryTypesFull();

  return (
    <Page
      loading={weekLoading || categoryLoading || !categoryTypeData || !weekData}
      tabTitle="Dashboard"
    >
      <MainDashboardWrapper>
        <MainDashboardNavBar />
        <MainDashboardTable
          categories={weekData?.categories}
          notes={weekData?.notes}
          categoryTypeData={categoryTypeData}
        />
      </MainDashboardWrapper>
    </Page>
  );
};
