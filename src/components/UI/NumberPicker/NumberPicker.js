import styles from "./NumberPicker.module.scss";
import { useState } from "react";

const NumberPicker = (props) => {
  const defaultValue = (props.value === undefined) ? props.min : props.value;
  const [number, setNumber] = useState(defaultValue);
  const [warning, setWarning] = useState("");

  const onClickMinus = (e) => {
    e.preventDefault();
    if (number <= props.min) {
      setWarning(`Minimum number is ${props.min}!`);
    }
    else {
      setWarning("");
    }
    setNumber(i => (i > props.min) ? i - 1 : i);
  };

  const onClickPlus = (e) => {
    e.preventDefault();
    if (number >= props.max) {
      setWarning(`Maximum number is ${props.max}!`);
    }
    else {
      setWarning("");
    }
    setNumber(i => (i < props.max) ? i + 1 : i);
  };

  return (
    <div className={styles["number-picker-container"]}>
      <div className={styles["number-picker"]}>
        <button className={styles.button} onClick={onClickMinus}>
          <svg width="42" height="42">
            <rect x="8" y="18.5" width="26" height="5" rx="2.5" />
          </svg>
        </button>
        <div className={styles.number} ref={props.useRef}>{number}</div>
        <button className={styles.button} onClick={onClickPlus}>
          <svg width="42" height="42">
            <rect x="8" y="18.5" width="26" height="5" rx="2.5" />
            <rect x="18.5" y="8" width="5" height="26" rx="2.5" />
          </svg>
        </button>
      </div>
      <div className={styles.warning}>{warning}</div>
    </div>
  );
};

export default NumberPicker;