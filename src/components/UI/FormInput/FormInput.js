import styles from "./FormInput.module.scss";
import { useCallback, useEffect, useState } from "react";
import { ValidationError } from "yup";

const FormInput = (props) => {
  const [error, setError] = useState("");

  const validate = useCallback(() => {
    try {
      props.validator.validateSync(props.useRef.current.value);
      setError("");
      return true;
    }
    catch (err) {
      if (err instanceof ValidationError) {
        setError(err.message);
      }
      return false;
    }
  }, [props.useRef, props.validator]);

  const onChange = (e) => {
    if (props.onChange) {
      props.onChange(e);
    }
    validate();
  };

  // Add the validate function to ref so it can be called externally
  useEffect(() => {
    props.useRef.current.validate = validate;
  }, [props.useRef, validate]);

  return (
    <div className={styles["input-field"]}>
      <label htmlFor={props.id}>{props.label}</label>
      {(props.type === "select" && props.options !== undefined)
        ? <select
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={onChange}
          onBlur={validate}
          ref={props.useRef}
        >
          {props.options.map((e, i) => <option key={i}>{e}</option>)}
        </select>
        : <input
          type={props.type}
          id={props.id}
          name={props.name}
          placeholder={props.placeholder}
          defaultValue={props.defaultValue}
          onChange={onChange}
          onBlur={validate}
          ref={props.useRef}
        />}
      <div className={styles["error"]}>{error}</div>
    </div>
  );
};

export default FormInput;