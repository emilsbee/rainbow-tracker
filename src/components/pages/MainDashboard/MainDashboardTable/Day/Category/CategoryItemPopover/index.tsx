import * as i from 'types';
import * as React from 'react';

import {
  CategoryPopoverContainer, CategoryPopoverSquare,
} from './styled';

export const CategoryPopover: React.FC<CategoryItemPopoverType> = ({
  onClick, handleCloseModal, categoryTypes,
}) => {
  return (
    <div>
      <CategoryPopoverContainer onMouseLeave={handleCloseModal}>
        {categoryTypes.map((categoryType) => {
          if (!categoryType.archived) {
            return (
              <CategoryPopoverSquare
                key={categoryType.categoryid}
                onClick={() => onClick(categoryType.categoryid)}
                backgroundColor={categoryType.color}
              />
            );
          } else return null;
        })}
        <CategoryPopoverSquare onClick={() => onClick(null)} />
      </CategoryPopoverContainer>
    </div>
  );
};

type CategoryItemPopoverType = {
  onClick: (categoryid:string | null) => void;
  handleCloseModal: () => void;
  categoryTypes: i.CategoryType[];
};
