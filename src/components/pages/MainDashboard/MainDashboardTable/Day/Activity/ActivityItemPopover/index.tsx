import * as i from 'types';
import * as React from 'react';

import { Text } from 'common/typography';

import { ActivityPopoverContainer, ActivityPopoverColor } from './styled';

export const ActivityItemPopover: React.FC<ActivityItemPopoverProps> = ({
  onClick, handleCloseModal, categoryid, activityTypes,
}) => {
  return (
    <div>
      <ActivityPopoverContainer onMouseLeave={handleCloseModal}>
        {activityTypes.map((activityType, index) => {
          if (activityType.categoryid === categoryid && !activityType.archived) { // checks that the activity belongs to current category
            return (
              <ActivityPopoverColor
                onClick={() => onClick(activityType.activityid)}
                key={activityType.activityid}
              >
                <Text variant="orange">{activityType.short}</Text>
              </ActivityPopoverColor>
            );
          } else return null;
        })}

        <ActivityPopoverColor onClick={() => onClick(null)} />
      </ActivityPopoverContainer>
    </div>
  );
};

type ActivityItemPopoverProps = {
  onClick: (activityid: string | null) => void;
  handleCloseModal: () => void;
  categoryid: string | null;
  activityTypes: i.ActivityType[];
};
