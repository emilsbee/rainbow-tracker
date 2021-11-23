import * as i from "types";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

import "./edit-activity-form.scss";
import { useStoreActions, useStoreState } from "../../../store/hookSetup";
import { ReactComponent as Loader } from "../../../svgIcons/spinner.svg";
import Switch from "../../BasicComponents/Switch/Switch";
import { checkIfActivityExists, checkIfCategoryExists } from "./helpers";


const EditActivityForm:React.FC = () => {
  const history = useHistory();

  // URL parameters
  const { categoryid, activityid } = useParams<{ categoryid: string, activityid: string }>();

  const title = activityid === "new" ? "Create new activity" : "Edit activity";

  // Store state
  const categoryTypes = useStoreState((state) => state.settings.categoryTypes);
  const activityTypes = useStoreState((state) => state.settings.activityTypes);
  const userid = useStoreState((state) => state.auth.uid);

  // Store actions
  const fetchCategoryTypesFull = useStoreActions((actions) => actions.settings.fetchCategoryTypesFull);
  const updateActivityType = useStoreActions((actions) => actions.settings.updateActivityType);
  const createActivityType = useStoreActions((actions) => actions.settings.createActivityType);

  // Local state
  const [activityLong, setActivityLong] = React.useState<string>("");
  const [activityShort, setActivityShort] = React.useState<string>("");
  const [activityArchived, setActivityArchived] = React.useState<boolean>(false);
  const [categoryType, setCategoryType] = React.useState<i.CategoryType>({} as i.CategoryType);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    (async function () {
      setLoading(true);

      try {
        await fetchCategoryTypesFull({ userid });

        if (activityid === "new") {
          const { exists, categoryType } = checkIfCategoryExists(categoryTypes, categoryid);
          if (!exists) {
            history.goBack();
          } else {
            setCategoryType(categoryType);
          }
        } else {
          const categoryExists = checkIfCategoryExists(categoryTypes, categoryid);
          const activityExists = checkIfActivityExists(activityTypes, activityid);

          if (!categoryExists.exists || !activityExists.exists) {
            history.goBack();
          } else {
            setActivityLong(activityExists.activityType.long);
            setActivityShort(activityExists.activityType.short);
            setActivityArchived(activityExists.activityType.archived);
            setCategoryType(categoryExists.categoryType);
          }
        }
      } catch (e:any) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async (e:  React.FormEvent<HTMLFormElement>):Promise<void> => {
    e.preventDefault();

    if (activityLong.length > 0 && activityShort.length > 0) {
      if (activityid === "new") {
        try {
          await createActivityType({
            userid,
            activityType: {
              userid,
              categoryid,
              activityid,
              long: activityLong,
              short: activityShort,
              archived: activityArchived,
            },
          });
        } catch (e: any) {
          console.error(e.message);
        } finally {
          history.push("/settings");
        }

      } else {
        try {
          await updateActivityType({
            userid,
            activityType: {
              userid,
              categoryid,
              activityid,
              long: activityLong,
              short: activityShort,
              archived: activityArchived,
            },
          });

          history.push("/settings");
        } catch (e: any) {
          console.error(e.message);
        } finally {
          history.push("/settings");
        }

      }
    }
  };

  if (loading) {
    return (
      <div id="main-dashboard-table__loading">
        <Loader style={{ height: "6rem", width: "6rem" }} />
      </div>
    );
  }

  return (
    <section className={"edit-activity-form__container"}>
      <div className={"edit-activity-form__title-container"}>
        <h1>{title}</h1>
      </div>

      <form className={"edit-activity-form__form"} onSubmit={handleSave}>
        <section className={"edit-activity-form__form-section"}>
          <label htmlFor={"category"} className={"edit-activity-form__label"}>Part of category</label>
          <section className={"edit-activity-form__category-section"}>
            <p className={"edit-activity-form__category"}>
              {categoryType.name}
            </p>
            <div style={{ backgroundColor: categoryType.color }} className={"edit-activity-form__category-color"} />
          </section>
        </section>

        <section className={"edit-activity-form__form-section"}>
          <label htmlFor={"long"} className={"edit-activity-form__label"}>Long description</label>
          <textarea
            name={"long"}
            value={activityLong}
            onChange={(e) => setActivityLong(e.target.value)}
            className={"edit-activity-form__long-input"}
            maxLength={100}
          />
        </section>

        <section className={"edit-activity-form__form-section"}>
          <label htmlFor={"short"} className={"edit-activity-form__label"}>Short abbreviation</label>
          <input
            name={"short"}
            type="text"
            value={activityShort}
            onChange={(e) => setActivityShort(e.target.value)}
            className={"edit-activity-form__short-input"}
            maxLength={2}
          />
        </section>

        <section className={"edit-activity-form__form-section"}>
          <label htmlFor={"archived"} className={"edit-activity-form__label"}>Archived</label>
          <Switch onChange={setActivityArchived} value={activityArchived} />
        </section>

        <section className={"edit-activity-form__form-section"}>
          <div />
          <button className={"button-pos"}>Save</button>
        </section>
      </form>
    </section>
  );
};

export default EditActivityForm;
