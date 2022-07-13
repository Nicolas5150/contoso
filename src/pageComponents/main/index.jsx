import { useContext } from "react";
import { FoodContext } from "../../store/foodContext";

import Card from "../../uiComponents/card";

import styles from "./index.module.css";

export default function Main() {
  const foodCTX = useContext(FoodContext);

  // On first load until the use effect kicks in, we will have an empty list -
  // Once the data comes back we can retrieve the current menu item list
  // and update when the state of activeSideMenuItem changes.
  const activeSideMenuList =
    foodCTX.activeSideMenuItem !== null ? setActiveList() : [];

  // Returns the list relative to the active side menu.
  function setActiveList() {
    const findActiveSideMenuList = (sideMenuList) =>
      foodCTX.activeSideMenuItem === sideMenuList.name;
    const idx = foodCTX.menuData.findIndex(findActiveSideMenuList);
    return foodCTX.menuData[idx].items;
  }

  return (
    <div className={`${styles.wrapper} flex_row`}>
      {activeSideMenuList.map((menuItem) => {
        return <Card key={menuItem.id} menuItem={menuItem} />;
      })}
    </div>
  );
}
