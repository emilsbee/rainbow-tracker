import * as i from "types";
import { debounce } from "debounce";
import { action, thunkOn } from "easy-peasy";

import store from "../storeSetup";
import { history } from "../../routers/AppRouter";

const categoriesModel: i.CategoriesModel = {
  categories: [],
  setCategories: action((state, payload) => {
    state.categories = payload.categories;
  }),
  setCategory: action((state, payload) => {
    let dayIndex = -1;
    let categoryIndex = -1;

    for (let i = 0; i < state.categories.length; i++) {
      for (let j = 0; j < state.categories[i].length; j++) {
        const category = state.categories[i][j];

        if (category.categoryPosition === payload.categoryPosition && category.weekDay === payload.weekDay) {
          dayIndex = i;
          categoryIndex = j;
          break;
        }
      }
    }

    if (dayIndex !== -1 && categoryIndex !== -1) {
      state.categories[dayIndex][categoryIndex].categoryid = payload.categoryid;
      state.categories[dayIndex][categoryIndex].activityid = null;
    }
  }),
  setActivity: action((state, payload) => {
    let dayIndex = -1;
    let categoryIndex = -1;

    for (let i = 0; i < state.categories.length; i++) {
      for (let j = 0; j < state.categories[i].length; j++) {
        const category = state.categories[i][j];

        if (category.categoryPosition === payload.categoryPosition && category.weekDay === payload.weekDay) {
          dayIndex = i;
          categoryIndex = j;
          break;
        }
      }
    }

    if (dayIndex !== -1 && categoryIndex !== -1) {
      state.categories[dayIndex][categoryIndex].activityid = payload.activityid;
    }
  }),
  syncToDb: thunkOn(
    (actions) => [actions.categoryDragSet, actions.setCategory, actions.setActivity],
    // @ts-ignore
    debounce(
      async function (actions, target) {
        const userid: string = store.getState().auth.uid; // User's id
        const categories: i.Category[][] = store.getState().categories.categories; // All current week's categories
        const weekDay: number = target.payload.weekDay;

        try {
          const res = await fetch(`api/user/${userid}/week/${categories[0][0].weekid}/day/${weekDay}/categories `, {
            method: "PATCH",
            mode: "cors",
            credentials: "include",
            headers: {
              "Accept": "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(categories[weekDay]),
          });

          if (!res.ok) {
            history.push("/internal-error");
          }
        } catch (e) {
          history.push("/internal-error");
        }
      },
      200,
    ),
  ),

  categoryDragSet: action((state, payload) => {

    const dragPosition = payload.dragPosition;
    const draggedIntoPosition = payload.draggedIntoPosition;
    const weekDay = payload.weekDay;
    const dragCategoryid = payload.dragCategoryid;
    const dragActivityid = payload.dragActivityid;

    const categoriesToUpdate = []; // categories between drag category and category dragged onto (including)

    if (dragPosition > draggedIntoPosition) { // if dragging upwards
      for (let c = draggedIntoPosition; c < dragPosition; c++) { // Iterates downwards starting from the category that was dragged onto
        categoriesToUpdate.push(c);
      }
    } else { // if dragging downwards
      for (let p = dragPosition + 1; p < draggedIntoPosition + 1; p++) { // Iterates downwards starting from the next category after the original drag category
        categoriesToUpdate.push(p);
      }
    }

    for (let i = 0; i < state.categories.length; i++) {
      for (let j = 0; j < state.categories[i].length; j++) {
        const category = state.categories[i][j];

        if (categoriesToUpdate.includes(category.categoryPosition) && category.weekDay === weekDay) {
          state.categories[i][j].categoryid = dragCategoryid;
          state.categories[i][j].activityid = dragActivityid;
        }
      }
    }
  }),
};

export default categoriesModel;
