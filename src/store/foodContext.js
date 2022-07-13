import { createContext, useState } from "react";
import { cloneDeep } from "lodash";
import { getMenuData } from "../apis/get";

export const FoodContext = createContext({
  initMenuData: () => {},
  addToUserOrder: (menuItem) => {},
  removeFromUserOrder: (menuItem) => {},
  clearAllFromUserOrder: () => {},
  updateActiveSideMenuItem: (sideMenuItemName) => {},
});

// Provides context to all the components interested in listening to the values and its updates.
// https://reactjs.org/docs/context.html#reactcreatecontext
export function FoodContextProvider(props) {
  const [menuData, setMenuData] = useState([]);
  const [userOrder, setUserOrder] = useState({});
  const [userOrderLength, setUserOrderLength] = useState(0);
  const [activeSideMenuItem, setActiveSideMenuItem] = useState(null);

  function initMenuData() {
    getMenuData().then((data) => {
      // Default to the first name in the list
      setActiveSideMenuItem(data.menus[0].name);
      setMenuData(data.menus);
    });
  }

  // This object uses the menu item name as the key (since it's assumed it's unique and easier to read / debug).
  // The objects value is another object which stores reference to the menu item data and the current count.
  // This is done in parallel to the userOrderLength to perform quicker operations since we neither have to loop
  // to get the current count or find a particular menu item we have saved for the user - alongside its count.
  function addToUserOrder(menuItem) {
    const updatedUserOrder = cloneDeep(userOrder);

    if (menuItem.name in updatedUserOrder) {
      updatedUserOrder[menuItem.name] = {
        count: ++updatedUserOrder[menuItem.name].count,
        info: menuItem,
      };
    } else {
      updatedUserOrder[menuItem.name] = {
        count: 1,
        info: menuItem,
      };
    }

    setUserOrder(updatedUserOrder);
    setUserOrderLength(userOrderLength + 1);
  }

  function removeFromUserOrder(menuItem) {
    const updatedUserOrder = cloneDeep(userOrder);

    if (menuItem.name in updatedUserOrder) {
      console.log(updatedUserOrder[menuItem.name].count);
      if (updatedUserOrder[menuItem.name].count === 1) {
        delete updatedUserOrder[menuItem.name];
      } else {
        --updatedUserOrder[menuItem.name].count;
      }

      setUserOrder(updatedUserOrder);
      setUserOrderLength(userOrderLength - 1);
    }
  }

  function clearAllFromUserOrder() {
    setUserOrder({});
    setUserOrderLength(0);
  }

  function updateActiveSideMenuItem(sideMenuItemName) {
    setActiveSideMenuItem(sideMenuItemName);
  }

  const context = {
    menuData,
    userOrder,
    userOrderLength,
    activeSideMenuItem,
    initMenuData,
    addToUserOrder,
    removeFromUserOrder,
    clearAllFromUserOrder,
    updateActiveSideMenuItem,
  };

  return (
    <FoodContext.Provider value={context}>
      {props.children}
    </FoodContext.Provider>
  );
}
