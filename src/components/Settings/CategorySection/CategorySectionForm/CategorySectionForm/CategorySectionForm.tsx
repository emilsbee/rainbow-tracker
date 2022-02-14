import * as i from 'types';
import React from 'react';

import './category-section-form.scss';
import Section from '../Section/Section';
import ActivityList from '../../../ActivityList/ActivityList';
import { validateCategorySubmission } from '../../../../../store/categories/helpers';
import { useStoreActions, useStoreState } from '../../../../../store/hookSetup';
import { archiveCategory, restoreCategoryType } from '../../../../../dao/settingsDao';

type CategorySectionFormProps = {
  category: i.CategoryType,
  activityTypes: i.ActivityType[],
  setLoading: (loading: boolean) => void,
  viewArchived:boolean
}

function CategorySectionForm({ category, activityTypes, setLoading, viewArchived }: CategorySectionFormProps) {
  // Store state
  const userid = useStoreState((state) => state.auth.uid);

  // Store actions
  const updateCategoryType = useStoreActions((actions) => actions.settings.updateCategoryType);
  const archiveCategoryType = useStoreActions((actions) => actions.settings.archiveCategoryType);
  const restoreCategoryTypeLocally = useStoreActions((actions) => actions.settings.restoreCategoryType);

  // Local state
  const [colorValue, setColorValue] = React.useState(category.color);
  const [nameValue, setNameValue] = React.useState(category.name);
  const [error, setError] = React.useState({ message: '' });

  React.useEffect(() => {
    setColorValue(category.color);
    setNameValue(category.name);
  }, [category.name, category.categoryid, category.color]);

  /**
     * Handles press on save button.
     */
  const handleFormSubmit = async (): Promise<void> => {
    const { valid, message } = validateCategorySubmission(category.categoryid, nameValue, colorValue);

    if (valid) {
      setLoading(true);

      try {
        await updateCategoryType({
          userid,
          categoryType: {
            userid: category.userid,
            categoryid: category.categoryid,
            name: nameValue,
            color: colorValue,
            archived: category.archived,
          },
        });
      } catch (e:any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError({ message });
    }
  };

  /**
     * Handles delete category type.
     */
  const handleArchiveCategory = async () => {
    const success = await archiveCategory(userid, category.categoryid);
    if (success) {
      archiveCategoryType({ categoryType: category });
    }
  };

  /**
     * Handle restore category type.
     */
  const handleRestoreCategory = async () => {
    const success = await restoreCategoryType(userid, category.categoryid);
    if (success) {
      restoreCategoryTypeLocally({ categoryType: category });
    }
  };

  return (
    <div className={'category-section-form-container'}>
      <div className={'category-section-form-error'}>
        {error.message}
      </div>

      <Section title="Name">
        <input
          type={'text'}
          className={'category-section-form__category-name'}
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          maxLength={18}
        />
      </Section>

      <Section title="Color">
        <div className={'color-section-container'}>
          <div style={{ backgroundColor: colorValue }} className={'color-section-color'} />
          <input
            style={{ color: colorValue }}
            type="text"
            className="category-section-form__category-color"
            value={colorValue}
            onChange={(e) => setColorValue(e.target.value)}
            maxLength={7}
          />
        </div>
      </Section>

      <Section title={'Activities'}>
        <ActivityList
          viewArchived={viewArchived}
          categoryid={category.categoryid}
          activityTypes={activityTypes}
        />
      </Section>

      <Section title={''}>
        <div>
          {!category.archived &&
                        <button className={'button-dlt'} onClick={handleArchiveCategory} style={{ marginRight: 40 }}>Archive</button>
          }
          {category.archived &&
                        <button className={'button-pos'} onClick={handleRestoreCategory} style={{ marginRight: 40 }}>Restore</button>
          }
          <button className={'button-pos'} onClick={handleFormSubmit}>Save</button>
        </div>
      </Section>

    </div>
  );
}

export default CategorySectionForm;
