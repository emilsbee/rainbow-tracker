import * as i from 'types';
import React, { useState } from 'react';
import { DateTime, Info } from 'luxon';

import { findNoteStackExtremes } from 'services';
import { useKeyPress } from 'hooks';
import { Text } from 'common/typography';

import { useStoreActions } from '../../../../../store/hookSetup';
import { CategoryItem } from './Category';
import { NoteModal } from './Note/NoteModal';
import { DayNotes } from './DayNotes';
import {
  DayContainer, DayHeaderContainer, DayCompositionContainer,
  DayCategories, NodeModalWrapper,
} from './styled';

const DayComponent: React.FC<DayProps> = ({
  categories, notes, weekDay, categoryTypeData,
}) => {
  const controlPress = useKeyPress('Control');

  const categoryDragSet = useStoreActions((actions) => actions.categories.categoryDragSet);
  const setNoteText = useStoreActions((actions) => actions.notes.setNoteText);
  const deleteNoteText = useStoreActions((actions) => actions.notes.deleteNoteText);
  const deleteNoteStack = useStoreActions((actions) => actions.notes.deleteNoteStack);
  const setHoverIndex = useStoreActions((actions) => actions.settings.setHoverIndex);

  // Note modal logic
  const [noteModalData, setNoteModalData] = useState<i.Note | null>(null);

  const onNoteClick = (note: i.Note):void => {
    if (controlPress) {
      deleteNoteText(note);
    } else {
      setNoteModalData(note);
    }
  };

  const onNoteSave = (note: i.Note):void => {
    setNoteText(note);
    setNoteModalData(null);
  };

  const onNoteDeleteText = (note: i.Note):void => {
    deleteNoteText(note);
    setNoteModalData(null);
  };

  const onNoteDeleteStack = (note: i.Note) => {
    deleteNoteStack(note);
    setNoteModalData(null);
  };

  // Drag image
  const initDragImageState = ():HTMLImageElement => {
    // Initialise the drag "ghost" transparent image
    const dragImg: HTMLImageElement = new Image(0, 0);
    dragImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    return dragImg;
  };

  // CategoryType logic
  const [dragCategory, setDragCategory] = useState<i.Category | null>(null);

  const onCategoryDragStart = (e:  React.DragEvent<HTMLDivElement>, category: i.Category) => {
    e.dataTransfer.setDragImage(initDragImageState(), 1, 1); // Sets the ghost image

    setDragCategory(category); // Sets the category
    setHoverIndex({ timeHoverIndex: category.categoryPosition - 1 });
  };

  const onCategoryDragEnter = (category: i.Category) => {
    if (dragCategory) {
      categoryDragSet({
        dragPosition: dragCategory.categoryPosition,
        draggedIntoPosition: category.categoryPosition,
        weekDay,
        dragCategoryid: dragCategory.categoryid,
        dragActivityid: dragCategory.activityid,
      });
    }
    setHoverIndex({ timeHoverIndex: category.categoryPosition - 1 });
  };

  return (
    <DayContainer onDragEndCapture={() => setDragCategory(null)}>
      <DayHeaderContainer>
        <Text size={18}>{`${Info.weekdays()[weekDay]}`}</Text>
        <Text variant={['gray', 'light']}>
          {`${DateTime.fromISO(categories[0].weekDayDate).toLocaleString({ month: 'long', day: 'numeric' })}`}
        </Text>
      </DayHeaderContainer>

      <DayCompositionContainer>
        <DayCategories>
          {categories.map((category) => (
            <CategoryItem
              key={category.categoryPosition}
              category={category}
              onDragStart={onCategoryDragStart}
              onDragEnter={onCategoryDragEnter}
              categoryTypeData={categoryTypeData}
            />
          ))}
        </DayCategories>

        <DayNotes notes={notes} onClick={onNoteClick} />
      </DayCompositionContainer>

      {noteModalData &&
        <NodeModalWrapper onClick={() => setNoteModalData(null)}>
          <NoteModal
            stack={findNoteStackExtremes(notes, noteModalData.stackid).max !== findNoteStackExtremes(notes, noteModalData.stackid).min} // Determines whether note is a stack or not. True is stack, false otherwise
            deleteStack={onNoteDeleteStack}
            deleteText={onNoteDeleteText}
            saveNote={onNoteSave}
            note={noteModalData}
          />
        </NodeModalWrapper>
      }
    </DayContainer>
  );
};

type DayProps = {
  categories: i.Category[];
  notes: i.Note[];
  weekDay: number;
  categoryTypeData: i.CategoryTypesFull;
};


// Memoization of the Day component to prevent the many unnecessary
// re-renders. This is because the data comes from parent component and all days
// are updated when something changes in one day since in easy-peasy notes is one big array.
const areEqual = (prevProps: DayProps, nextProps: DayProps) => {
  return (
    JSON.stringify(prevProps.notes) === JSON.stringify(nextProps.notes)
        && JSON.stringify(prevProps.categories) === JSON.stringify(nextProps.categories)
  );
};

export const Day = React.memo(DayComponent, areEqual);
