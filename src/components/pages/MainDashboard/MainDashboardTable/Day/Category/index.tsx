import * as i from 'types';
import * as React from 'react';

import { useStoreActions } from '../../../../../../store/hookSetup';
import { ActivityItemPopover } from '../Activity/ActivityItemPopover';
import { Activity } from '../Activity';
import { CategoryPopover } from './CategoryItemPopover';
import { hasActivities } from './helpers';
import { CategoryItemContainer, CategoryItemColor } from './styled';

export const CategoryItem: React.FC<CategoryProps> = ({
  category, onDragStart, onDragEnter, categoryTypeData,
}) => {
  const setHoverIndex = useStoreActions((actions) => actions.settings.setHoverIndex);
  const setCategory = useStoreActions((actions) => actions.categories.setCategory);
  const setActivity = useStoreActions((actions) => actions.categories.setActivity);

  const [showActivityPopover, setShowActivityPopover] = React.useState(false);
  const [showPopover, setShowPopover] = React.useState(false);

  const { categoryTypes, activityTypes } = categoryTypeData;

  const onCategoryPick = (categoryid:string | null):void => {
    setShowPopover(false);
    setCategory({
      userid: category.userid,
      weekid: category.weekid,
      categoryid,
      weekDay: category.weekDay,
      categoryPosition: category.categoryPosition,
      activityid: null,
      weekDayDate: category.weekDayDate,
    });
  };

  const onActivityPick = (activityid:string | null):void => {
    setShowActivityPopover(false);
    setActivity({
      activityid,
      weekDay: category.weekDay,
      categoryPosition: category.categoryPosition,
    });
  };

  const getBackgroundColor = ():string => {
    if (category.categoryid) {
      for (let i = 0; i < categoryTypes.length; i++) {
        if (categoryTypes[i].categoryid === category.categoryid) {
          return categoryTypes[i].color;
        }
      }
    }

    return '#2A353C';
  };

  const getActivityTypeShort = ():string => {
    if (category.activityid) {
      for (let i = 0; i < activityTypes.length; i++) {
        if (activityTypes[i].activityid === category.activityid) {
          return activityTypes[i].short;
        }
      }
    }
    return '';
  };

  return (
    <CategoryItemContainer onMouseOver={() => setHoverIndex({ timeHoverIndex: category.categoryPosition - 1 })}>
      <CategoryItemColor
        onDragEnter={() => onDragEnter(category)}
        onDragStart={(e) => onDragStart(e, category)}
        draggable
        onClick={() => setShowPopover(true)}
        backgroundColor={getBackgroundColor()}
      />

      <Activity
        short={getActivityTypeShort()}
        categoryid={category.categoryid}
        block={!hasActivities(category.categoryid, activityTypes)}
        onClick={() => setShowActivityPopover(true)}
      />

      {showPopover && (
        <CategoryPopover
          onClick={onCategoryPick}
          handleCloseModal={() => setShowPopover(false)}
          categoryTypes={categoryTypes}
        />
      )}

      {showActivityPopover && (
        <ActivityItemPopover
          categoryid={category.categoryid}
          onClick={onActivityPick}
          handleCloseModal={() => setShowActivityPopover(false)}
          activityTypes={activityTypes}
        />
      )}
    </CategoryItemContainer>
  );
};

type CategoryProps = {
  category: i.Category;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, category: i.Category) => void;
  onDragEnter: (category: i.Category) => void;
  categoryTypeData: i.CategoryTypesFull;
};
