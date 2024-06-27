import * as React from 'react';

import { Text } from 'common/typography';

import { ActivityItemContainer } from './styled';

export const Activity: React.FC<ActivityProps> = ({
  short, categoryid, onClick, block,
}) => {
  const handleClick = () => {
    if (categoryid !== '' && !block) {
      onClick();
    }
  };

  return (
    <ActivityItemContainer
      onClick={handleClick}
      isActive={!block}
    >
      <Text size={14} variant="orange">{short}</Text>
    </ActivityItemContainer>
  );
};

type ActivityProps = {
  short: string;
  categoryid: string | null;
  onClick: () => void;
  block: boolean;
}
