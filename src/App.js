import { useContext, useEffect } from "react";
import { FoodContext } from "./store/foodContext";

import Nav from "./pageComponents/nav";
import Side from "./pageComponents/side";
import Main from "./pageComponents/main";

import "normalize.css";
import Style from "./App.module.css";

function App() {
  const foodCTX = useContext(FoodContext);

  useEffect(() => {
    foodCTX.initMenuData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={Style.app}>
      <Nav />
      <div className="flex_row">
        <Side />
        <Main />
      </div>
    </div>
  );
}

export default App;
