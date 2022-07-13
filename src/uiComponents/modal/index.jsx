import { useEffect } from "react";
//import { ReactComponent as Close } from "../../assets/svg/x.svg";

import Button from "../button";

import styles from "./index.module.css";

export default function Modal(props) {
  const {
    children,
    ctaDisabled = false,
    ctaText,
    handleCta = () => {},
    hideModel = () => {},
    title = "Heading",
    visible = false,
  } = props;
  const body = document.querySelector("body");

  useEffect(() => {
    if (visible) {
      window.addEventListener("keyup", handleEscapeKey);

      return () => {
        window.removeEventListener("keyup", handleEscapeKey);
      };
    }
  });

  // No need to render if the visibility is set to false,
  // Else begin the render sequence and ensure the background cant scroll.
  if (!visible) {
    return null;
  } else {
    handleBodyScrollStop();
  }

  function handleBodyScrollStop() {
    body.style.overflow = "hidden";
  }

  function handleBodyScrollResume() {
    body.style.overflow = "auto";
    hideModel();
  }

  function handleEscapeKey(event) {
    if (event.code === "Escape") {
      handleBodyScrollResume();
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.body} flex_col`}>
        <div className={`${styles.heading} flex_row`}>
          <div>{title}</div>
          <div
            className={styles.close}
            onClick={() => handleBodyScrollResume(props.menuItem)}
            onKeyUp={(e) =>
              e.code === "Enter" || e.code === "NumpadEnter"
                ? handleBodyScrollResume()
                : null
            }
            tabIndex="0"
          >
            <img
              alt="Close icon"
              height="15px"
              src="https://www.svgrepo.com/show/66823/close.svg"
              width="15px"
            ></img>
          </div>
        </div>
        <div className={styles.main_content}>{children}</div>
        <div className={`${styles.button_row} flex_row`}>
          <Button
            clickEvent={() => {
              handleBodyScrollResume();
              handleCta();
            }}
            disabled={ctaDisabled ? true : false}
            text={ctaText}
          />
        </div>
      </div>
    </div>
  );
}
