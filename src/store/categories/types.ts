import * as i from 'types';
import { Action, ThunkOn } from 'easy-peasy';

export interface CategoriesModel {
  categories: i.Category[][],
  setCategory: Action<i.CategoriesModel, i.Category>,
  setActivity: Action<i.CategoriesModel, { categoryPosition: number, weekDay: number, activityid: string | null}>,
  syncToDb: ThunkOn<i.CategoriesModel>,
  /**
     * Updates categories and their respective activities between the drag
     * category and the category that was dragged onto.
     * Works for both dragging upwards and downwards. The dragging can occur without touching
     * categories between the drag category and the dragged onto category. This method will "fill"
     * in the missed categories as if they were dragged onto.
  */
  categoryDragSet: Action<i.CategoriesModel, { dragPosition:number, draggedIntoPosition:number, weekDay: number, dragCategoryid:string | null, dragActivityid:string | null }>
}
