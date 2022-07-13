import { useContext } from "react";
import { FoodContext } from "../../store/foodContext";

import styles from "./index.module.css";

export default function Side() {
  const foodCTX = useContext(FoodContext);

  // Change the stored active side menu name globally.
  // This will also allow for the proper active class be added to the selected item.
  function handleMenuUpdate(sideMenuItemName) {
    foodCTX.updateActiveSideMenuItem(sideMenuItemName);
  }

  return (
    <div className={styles.wrapper}>
      <ul>
        {foodCTX.menuData.map((menuItem) => {
          const { id, name } = menuItem;

          return (
            <li
              className={
                name === foodCTX.activeSideMenuItem ? styles.active : null
              }
              key={id}
              onClick={() => handleMenuUpdate(name)}
              onKeyUp={(e) =>
                e.code === "Enter" || e.code === "NumpadEnter"
                  ? handleMenuUpdate(name)
                  : null
              }
              tabIndex="0"
            >
              <div>{name}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
