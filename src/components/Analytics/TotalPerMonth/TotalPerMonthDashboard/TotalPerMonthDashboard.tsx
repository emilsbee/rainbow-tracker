// External imports
import React from 'react';

// Internal imports
import './total-per-month-dashboard.scss';
import { DateTime } from 'luxon';
import { useStoreState } from '../../../../store/hookSetup';
import { ReactComponent as Loader } from '../../../../svgIcons/spinner.svg';
import Card from '../../BasicComponents/Card/Card';
import CardTitle from '../../BasicComponents/Card/CardTitle/CardTitle';
import CategoryTable from '../../BasicComponents/CategoryTable/CategoryTable';
import CategoryPieChart from '../../BasicComponents/CategoryPieChart/CategoryPieChart';
import ActivityCardContent from '../../BasicComponents/ActivityCardContent/ActivityCardContent';

type TotalPerMonthDashboardProps = {
  loading: boolean
}

const TotalPerMonthDashboard:React.FC<TotalPerMonthDashboardProps> = ({ loading }) => {
  // Store state
  const totalPerMonth = useStoreState((state) => state.analytics.totalPerMonth);
  const currentMonthDate = useStoreState((state) => state.settings.currentMonthDate);

  React.useLayoutEffect(() => {
    const categoryTable = document.getElementById('total-per-week-dashboard__categories');
    const activityTable = document.getElementById('total-per-week-dashboard__activities');

    if (categoryTable && activityTable) {

      if (categoryTable.clientHeight > activityTable.clientHeight) {
        activityTable.style.height = `${categoryTable.clientHeight}px`;
      } else if (categoryTable.clientHeight < activityTable.clientHeight) {
        categoryTable.style.height = `${activityTable.clientHeight}px`;
      }
    }
  });

  if (loading) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: '6rem', width: '6rem' }} />
      </div>
    );
  }

  return (
    <section className={'total-per-month'}>

      <Card style={{ marginLeft: 0 }} id={'total-per-week-dashboard__categories'}>
        <CardTitle title={'Categories'} />

        <CategoryTable categoryTypes={totalPerMonth.categoryTypes} totalCount={(DateTime.fromObject({ month: currentMonthDate.month, year: currentMonthDate.year }).daysInMonth * 24 * 4)} />
        <CategoryPieChart categoryTypes={totalPerMonth.categoryTypes} totalCount={(DateTime.fromObject({ month: currentMonthDate.month, year: currentMonthDate.year }).daysInMonth * 24 * 4)} />
      </Card>

      <Card id={'total-per-week-dashboard__activities'}>
        <CardTitle title={'Activities'} />

        <ActivityCardContent
          categoryTypes={totalPerMonth.categoryTypes}
          activityTypes={totalPerMonth.activityTypes}
          totalCount={(DateTime.fromObject({ month: currentMonthDate.month, year: currentMonthDate.year }).daysInMonth * 24 * 4)}
        />
      </Card>
    </section>
  );
};

export default TotalPerMonthDashboard;
