// External imports
import React from 'react';

// Internal imports
import './Activity.scss';

type ActivityProps = {
  short: string,
  categoryid: string | null,
  onClick: () => void,
  block: boolean
}

const Activity = ({  short, categoryid, onClick, block }:ActivityProps) => {

  /**
     * Handles clicking on an activity.
     */
  const handleClick = () => {
    if (categoryid !== '' && !block) {
      onClick();
    }
  };

  return (
    <div
      // Block checks if a category has activities.
      // If it doesn't the activity shouldn't highlight on hover
      // and user shouldn't be able to click on activity to get activity popover
      className={`activity-container ${categoryid && !block && 'activity-container-active'}`}
      onClick={handleClick}
    >
      {short}
    </div>
  );
};

export default Activity;
