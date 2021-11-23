// External imports
import React from "react";

// Internal imports
import "./category-list.scss";
import { CategoryType } from "../../../../store/settings/settings";
import { ReactComponent as Add } from "../../../../svgIcons/add.svg";
import { useStoreActions, useStoreState } from "../../../../store/hookSetup";
import { useKeyPress } from "../../../../hooks/useKeyPress";

type CategoryListProps = {
  categoryTypes:CategoryType[],
  setCategory: (categoryid:string) => void,
  selectedCategoryid:string
  viewArchived:boolean
}

function CategoryList({ categoryTypes, setCategory, selectedCategoryid, viewArchived }:CategoryListProps) {
  // Store actions
  const createCategoryType = useStoreActions((actions) => actions.settings.createCategoryType);

  // Store state
  const userid = useStoreState((state) => state.auth.uid);

  // Local state
  const [newCategory, setNewCategory] = React.useState<boolean>(false);
  const [newCategoryName, setNewCategoryName] = React.useState<string>("");

  const escapeKeyPress = useKeyPress("Escape");

  React.useEffect(() => {
    setNewCategory(false);
    setNewCategoryName("");
  }, [escapeKeyPress]);

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();

    if (newCategory && newCategoryName.length > 0) {

      try {
        await createCategoryType({ userid, name: newCategoryName, color: "#CBC3E3" });
      } catch (e: any) {
        console.error(e.message);
      } finally {
        setNewCategory(false);
        setNewCategoryName("");
        setCategory("");
      }
    }
  };

  return (
    <div className="category-section-category-list-container">
      {categoryTypes.map((categoryType) => {

        if (viewArchived || (!viewArchived && !categoryType.archived)) {
          return (
            <div key={categoryType.categoryid} className={"category-section-category-list-item-container"}>
              <p
                className={`category-section-category-list-item${categoryType.categoryid === selectedCategoryid ? "-selected" : ""}`}
                onClick={() => setCategory(categoryType.categoryid)}
                style={{ opacity: categoryType.archived ? 0.5 : 1 }}
              >
                {categoryType.name}
              </p>
            </div>
          );
        } else return null;
      })}

      {newCategory &&
                <form onSubmit={handleSubmit}>
                  <input
                    autoFocus={true}
                    type={"text"}
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className={"category-section-category-list-add-input"}
                  />
                </form>
      }

      {!newCategory &&
                <Add height={16} width={16} fill={"white"} className={"category-section-category-list-add"} onClick={() => setNewCategory(true)} />
      }
    </div>
  );
}

export default CategoryList;
