import styles from "./index.module.css";

export default function Button(props) {
  const { text = "Click", clickEvent = () => {}, disabled = false } = props;
  return (
    <button
      className={styles.button}
      disabled={disabled ? true : false}
      onClick={() => clickEvent()}
    >
      {text}
    </button>
  );
}
