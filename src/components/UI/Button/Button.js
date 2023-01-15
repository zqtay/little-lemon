import styles from "./Button.module.scss";

const Button = (props) => {
  let className = styles.primary;
  if (props.primary) {
    className = styles.primary;
  }
  else if (props.secondary) {
    className = styles.secondary;
  }
  else {
    className = styles.default;
  }

  if (props.wide) {
    className += " " + styles.wide;
  }

  let onClick = (!props.href || props.href.length === 0) ?
    props.onClick :
    (e) => {
      e.preventDefault();
      window.location.href=props.href;
    };

  return (
    <button className={`${styles.button} ${className}`} onClick={onClick} type="button">
      {(typeof(props.children) === "string") ? props.children : props.text}
    </button>
  );
}

export default Button;