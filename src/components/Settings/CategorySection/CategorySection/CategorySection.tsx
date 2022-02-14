import * as i from 'types';
import React from 'react';

import './category-section.scss';
import SectionTitle from '../../SectionTitle/SectionTitle';
import CategoryList from '../CategoryList/CategoryList';
import CategorySectionForm from '../CategorySectionForm/CategorySectionForm/CategorySectionForm';
import { findCategoryForForm } from './helpers';

type CategorySectionProps = {
  categoryTypes: i.CategoryType[],
  activityTypes: i.ActivityType[],
  setLoading:(loading:boolean) => void
}

function CategorySection({ categoryTypes, activityTypes, setLoading }:CategorySectionProps) {
  // Local state
  const [viewArchived, setViewArchived] = React.useState<boolean>(false);
  const [selectedCategoryid, setSelectedCategoryid] = React.useState<string>(categoryTypes.length === 0 ? '' : categoryTypes[0].categoryid);

  React.useEffect(() => {
    const exists = localStorage.getItem('view-archived');

    if (exists === 'yes') {
      setViewArchived(true);
    }
  }, []);

  const handleSetViewArchived = () => {
    const newViewArchived = !viewArchived;

    if (newViewArchived) {
      localStorage.setItem('view-archived', 'yes');
    } else {
      localStorage.setItem('view-archived', 'no');
    }

    setViewArchived(newViewArchived);
  };

  return (
    <div className="category-section-container">
      <SectionTitle title={'Categories'} viewArchived={viewArchived} setViewArchived={handleSetViewArchived} />

      <div className={'category-section-content-container'}>
        <CategoryList
          viewArchived={viewArchived}
          categoryTypes={categoryTypes}
          setCategory={(categoryid) => setSelectedCategoryid(categoryid)}
          selectedCategoryid={selectedCategoryid}
        />

        {selectedCategoryid.length !== 0 &&
                    <CategorySectionForm
                      viewArchived={viewArchived}
                      category={findCategoryForForm(categoryTypes, selectedCategoryid)}
                      activityTypes={activityTypes}
                      setLoading={setLoading}
                    />
        }
      </div>
    </div>
  );
}

export default CategorySection;
