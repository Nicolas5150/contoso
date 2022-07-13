import { useContext, useState } from "react";
import { FoodContext } from "../../store/foodContext";

import styles from "./index.module.css";

export default function Card(props) {
  const {
    name = "Menu Item",
    display_price = "$9.99",
    picture_url,
  } = props.menuItem;
  const [isSelected, setIsSelected] = useState(false);
  const foodCTX = useContext(FoodContext);

  function handleAddingToUserOrder(menuItem) {
    foodCTX.addToUserOrder(menuItem);
  }

  // Used to know when a card's add button is either hovered or in focus.
  // This will then apply the css class with a small animation and ui change.
  function toggleActive(bool) {
    setIsSelected(bool);
  }

  return (
    <div
      className={`${styles.wrapper} ${
        isSelected ? styles.selected : null
      }`}
    >
      <div className={styles.img_wrapper}>
        <img src={picture_url} alt={`menu item ${name}`}></img>
      </div>
      <div className={styles.card_text}>
        <div className={styles.name}>{name}</div>
        <div className="flex_row">
          <div>{display_price}</div>
          <div
            className={styles.add}
            onBlur={() => toggleActive(false)}
            onClick={() => handleAddingToUserOrder(props.menuItem)}
            onFocus={() => toggleActive(true)}
            onKeyUp={(e) =>
              e.code === "Enter" || e.code === "NumpadEnter"
                ? handleAddingToUserOrder(props.menuItem)
                : null
            }
            onMouseEnter={() => toggleActive(true)}
            onMouseLeave={() => toggleActive(false)}
            tabIndex="0"
          >
            <span>+ </span>Add
          </div>
        </div>
      </div>
    </div>
  );
}
