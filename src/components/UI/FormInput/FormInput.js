import styles from "./FormInput.module.scss";

const FormInput = (props) => {
  return (
    <div className={styles.input}>
      <label>{props.label}</label>
      <input type={props.type} id={props.id} name={props.name} placeholder={props.placeholder} defaultValue={props.value} ref={props.useRef}></input>
      <div className={styles.error}>{props.error}</div>
    </div>
  );
};

export default FormInput;