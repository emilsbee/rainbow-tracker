import * as i from 'types';
import React from 'react';
import { Link } from 'react-router-dom';

import './activity-list-item.scss';
import { ReactComponent as Edit } from '../../../../svgIcons/edit.svg';

type ActivityListItemProps = {
  activity: i.ActivityType
}

const ActivityListItem:React.FC<ActivityListItemProps> = ({ activity }) => {
  // Local state
  const [hovering, setHovering] = React.useState<boolean>(false);

  return (
    <Link to={`/settings/category/${activity.categoryid}/edit-activity/${activity.activityid}`} className={'activity-list-item-link'}>
      <div className={'activity-list-item-container'} onMouseOver={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>

        <p className={`activity-list-item-name ${activity.archived && 'archived-activity'}`}>{activity.long} - {activity.short}</p>

        <div className={'activity-list-item__icon-container'}>
          {hovering &&
                        <Edit
                          className={'activity-list-item__edit-icon'}
                        />
          }
        </div>
      </div>
    </Link>
  );
};

export default ActivityListItem;
