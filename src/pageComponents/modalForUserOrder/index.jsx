import { useContext } from "react";
import { FoodContext } from "../../store/foodContext";
// import { ReactComponent as Arrow } from "../../assets/svg/arrow.svg";

import styles from "./index.module.css";

export function ModalForUserOrder() {
  const foodCTX = useContext(FoodContext);
  const { userOrder, addToUserOrder, removeFromUserOrder } = foodCTX;
  let total = 0.0;

  function handleAdditionalMenuItem(menuItem) {
    addToUserOrder(menuItem);
  }

  function handleRemovingMenuItem(menuItem) {
    removeFromUserOrder(menuItem);
  }

  const list = Object.keys(userOrder).map((key) => {
    const menuItem = userOrder[key];
    // Float the change value on the price two points for usd currency rounding.
    total =
      parseFloat(total) +
      parseFloat(menuItem.info.display_price.substring(1)) * menuItem.count;

    return (
      <li className="flex_row" key={key}>
        <div className={`${styles.name} flex_col`}>{key}</div>
        <div className={`${styles.price} flex_col`}>
          {menuItem.info.display_price}
        </div>
        <div className={`${styles.count_wrapper} flex_col`}>
          <div className={`${styles.count_wrapper_inner} flex_row`}>
            <div className="flex_row">
              <div
                className={`${styles.arrow_action} flex_row`}
                onClick={() => handleRemovingMenuItem(menuItem.info)}
                onKeyUp={(e) =>
                  e.code === "Enter" || e.code === "NumpadEnter"
                    ? handleRemovingMenuItem(menuItem.info)
                    : null
                }
                tabIndex="0"
              >
                <img
                  alt="Remove an item"
                  height="20px"
                  src="https://www.svgrepo.com/show/39001/left-arrow.svg"
                  width="20px"
                ></img>
                <span>-</span>
              </div>
              <div className={styles.item_count}>{menuItem.count}</div>
              <div
                className={`${styles.arrow_action} flex_row`}
                onClick={() => handleAdditionalMenuItem(menuItem.info)}
                onKeyUp={(e) =>
                  e.code === "Enter" || e.code === "NumpadEnter"
                    ? handleAdditionalMenuItem(menuItem.info)
                    : null
                }
                tabIndex="0"
              >
                <span>+</span>
                <img
                  alt="Add additional item"
                  className={styles.arrow_right}
                  height="20px"
                  src="https://www.svgrepo.com/show/39001/left-arrow.svg"
                  width="20px"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  return (
    <div className={`${styles.content} flex_col`}>
      <ul>{list}</ul>
      <div className="flex_row">
        <div className={styles.total}>Estimated Total: ${total.toFixed(2)}</div>
      </div>
    </div>
  );
}

// Passing in the context for the clear all function in the store
// to remove all items when submitting in the modal.
export function modalCta(clearAllFromUserOrder) {
  clearAllFromUserOrder();
}

export function hideModal(setModalVisible) {
  setModalVisible(false);
}
