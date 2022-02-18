import * as i from 'types';
import * as React from 'react';

import './MainDashboardWrapper.scss';
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable';
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar';
import { useStoreState, useStoreActions } from '../../../store/hookSetup';
import { getCategoryTypesFull } from '../../../dao/settingsDao';
import { createWeekByWeekNrAndYear, getWeekByWeekNrAndYear } from '../../../store/categories/helpers';

const MainDashboardWrapper = () => {
  const currentDate = useStoreState((state) => state.settings.currentDate);
  const categories: i.Category[][] = useStoreState((state) => state.categories.categories);
  const notes: i.Note[][] = useStoreState((state) => state.notes.notes);

  const setCategories = useStoreActions((actions) => actions.categories.setCategories);
  const setNotes = useStoreActions((actions) => actions.notes.setNotes);
  const setCategoryTypes = useStoreActions((actions) => actions.settings.setCategoryTypes);
  const setActivityTypes = useStoreActions((actions) => actions.settings.setActivityTypes);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      // Either fetches week right away or if it doesnt exist, it is created. Either way it will be set in store categories.
      let fullWeek: i.FullWeek | null = null;

      try {
        fullWeek = await getWeekByWeekNrAndYear(currentDate.weekNr, currentDate.year);
      } catch (e) {
        fullWeek = await createWeekByWeekNrAndYear(currentDate.weekNr, currentDate.year);
      }

      setCategories({ categories: fullWeek.categories });
      setNotes({ notes: fullWeek.notes });

      const categoryTypesFull: i.CategoryTypesFull = await getCategoryTypesFull();
      setCategoryTypes({ categoryTypes: categoryTypesFull.categoryTypes });
      setActivityTypes({ activityTypes: categoryTypesFull.activityTypes });

      setLoading(false);
    })();

  }, [currentDate.weekNr, currentDate.year]);

  return (
    <div id="main-dash-wrapper">
      <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year} />
      <MainDashboardTable categories={categories} notes={notes} loading={loading} />
    </div>
  );
};

export default MainDashboardWrapper;
