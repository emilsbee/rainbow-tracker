import * as i from 'types';
import React from 'react';
import { Link } from 'react-router-dom';

import './activity-list.scss';
import { ReactComponent as Add } from '../../../svgIcons/add.svg';
import ActivityListItem from './ActivityListItem/ActivityListItem';

type ActivityListProps = {
  activityTypes: i.ActivityType[],
  categoryid:string,
  viewArchived: boolean
}

const ActivityList:React.FC<ActivityListProps> = ({ activityTypes, categoryid, viewArchived }) => {

  return (
    <div className={'activity-list-container'}>
      <div>
        {activityTypes.map((activityType) => {
          if (activityType.categoryid === categoryid) {
            if (viewArchived || (!viewArchived && !activityType.archived)) {
              return (
                <ActivityListItem
                  key={activityType.activityid}
                  activity={activityType}
                />
              );
            } else return null;
          } else return null;
        })}
      </div>

      <div className={'activity-list-add-icon-container'}>
        <Link to={`/settings/category/${categoryid}/edit-activity/new`}>
          <Add className={'activity-list-add-icon'} />
        </Link>
      </div>
    </div>
  );
};

export default ActivityList;
