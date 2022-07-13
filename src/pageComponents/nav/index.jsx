import { useContext, useState } from "react";
import { FoodContext } from "../../store/foodContext";
import { ModalForUserOrder, modalCta, hideModal } from "../modalForUserOrder";
// Codesandbox refused to take svgs as a component:
// https://stackoverflow.com/questions/72405167/could-not-find-install-babel-plugin-proposal-decorators-on-codesandbox-with-fi
// import { ReactComponent as Cart } from "../../assets/svg/cart.svg";

import Button from "../../uiComponents/button";
import Modal from "../../uiComponents/modal";

import styles from "./index.module.css";

export default function Nav() {
  const [modalVisible, setModalVisible] = useState(false);
  const foodCTX = useContext(FoodContext);
  const { userOrderLength, clearAllFromUserOrder } = foodCTX;

  function handleOrderButton() {
    setModalVisible(true);
  }

  return (
    <>
      <Modal
        ctaDisabled={userOrderLength === 0}
        ctaText="Submit order"
        handleCta={() => modalCta(clearAllFromUserOrder)}
        hideModel={() => hideModal(setModalVisible)}
        title="Items:"
        visible={modalVisible}
      >
        <ModalForUserOrder />
      </Modal>
      <nav className={styles.wrapper}>
        <div className={styles.logo}>Contoso</div>
        <div className={styles.order_status}>
          <div className={`${styles.cart_content} flex_row`}>
            {/* <Cart height="20px" width="20px" /> */}
            <img
              alt="cart icon"
              height="20px"
              src="https://www.svgrepo.com/show/80543/shopping-cart-outline.svg"
              width="20px"
            ></img>
            <span className={styles.count}>{userOrderLength}</span>
            {userOrderLength !== 1 ? <span>items</span> : <span>item</span>}
          </div>
          <Button
            clickEvent={handleOrderButton}
            ctaText="Submit Order"
            disabled={userOrderLength === 0 ? true : false}
            text="Order"
          />
        </div>
      </nav>
    </>
  );
}
