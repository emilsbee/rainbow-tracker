import * as i from 'types';
import React from 'react';

import './MainDashboardWrapper.scss';
import MainDashboardTable from '../MainDashboardTable/MainDashboardTable';
import MainDashboardNavBar from '../MainDashboardNavBar/MainDashboardNavBar';
import { useStoreState, useStoreActions } from '../../../store/hookSetup';
import { getCategoryTypesFull } from '../../../dao/settingsDao';
import { getWeekByWeekNrAndYear } from '../../../store/categories/helpers';
import NewFeaturePopup from '../../NewFeaturePopup/NewFeaturePopup';
import { getPopupViewed } from '../../NewFeaturePopup/helpers';

const MainDashboardWrapper = () => {
  // Store state
  const featurePopupViewed = useStoreState((state) => state.settings.featurePopupViewed);
  const uid = useStoreState((state) => state.auth.uid);
  const currentDate = useStoreState((state) => state.settings.currentDate);
  const categories: i.Category[][] = useStoreState((state) => state.categories.categories);
  const notes: i.Note[][] = useStoreState((state) => state.notes.notes);

  // Store actions
  const setCategories = useStoreActions((actions) => actions.categories.setCategories);
  const setNotes = useStoreActions((actions) => actions.notes.setNotes);
  const setCategoryTypes = useStoreActions((actions) => actions.settings.setCategoryTypes);
  const setActivityTypes = useStoreActions((actions) => actions.settings.setActivityTypes);
  const setFeaturePopupViewed = useStoreActions((actions) => actions.settings.setFeaturePopupViewed);

  // Local state
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async function fetchData() {
      setLoading(true);

      // Either fetches week right away or if it doesnt exist, it is created. Either way it will be set in store categories.
      // await getWeek({weekNr: currentDate.weekNr, year: currentDate.year})
      const fullWeek: i.FullWeek[] = await getWeekByWeekNrAndYear(uid, currentDate.weekNr, currentDate.year);
      setCategories({ categories: fullWeek[0].categories });
      setNotes({ notes: fullWeek[0].notes });

      // Fetch category and activity types
      const categoryTypesFull: {activityTypes: i.ActivityType[], categoryTypes: i.CategoryType[]} = await getCategoryTypesFull(uid);
      setCategoryTypes({ categoryTypes: categoryTypesFull.categoryTypes });
      setActivityTypes({ activityTypes: categoryTypesFull.activityTypes });

      setLoading(false);
    })();

  }, [currentDate.weekNr, currentDate.year, uid]);

  React.useEffect(() => {
    setFeaturePopupViewed({ featurePopupViewed: getPopupViewed() });
  }, [setFeaturePopupViewed]);

  return (
    <div id="main-dash-wrapper">
      <MainDashboardNavBar weekNr={currentDate.weekNr} year={currentDate.year} />

      <MainDashboardTable categories={categories} notes={notes} loading={loading} />

      {!featurePopupViewed && <NewFeaturePopup />}
    </div>
  );
};

export default MainDashboardWrapper;
