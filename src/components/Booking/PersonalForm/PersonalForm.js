import styles from "../Booking.module.scss";
import Button from "../../UI/Button/Button";
import FormInput from "../../UI/FormInput/FormInput";
import BookingHeader from "../BookingHeader/BookingHeader";
import { PAGE_INDEX, validationSchema } from "../Booking";
import { useRef } from "react";

const placeHolder = {
  fName: "John",
  lName: "Doe",
  phone: "+12345678901",
  email: "john-doe@email.com"
};

const PersonalForm = ({ data, setData, setPage }) => {
  const fNameRef = useRef();
  const lNameRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  const onClick = (e) => {
    // Check inputs
    let isValid = fNameRef.current.validate();
    isValid &= lNameRef.current.validate();
    isValid &= phoneRef.current.validate();
    isValid &= emailRef.current.validate();
    if (isValid) {
      const newData = data === null ? {} : { ...data };
      newData.fName = fNameRef.current.value;
      newData.lName = lNameRef.current.value;
      newData.phone = phoneRef.current.value;
      newData.email = emailRef.current.value;
      setData(newData);
      setPage(PAGE_INDEX.CONFIRM);
    }
  };

  return (
    <>
      <BookingHeader subTitle="Personal Details" goBack={() => setPage(PAGE_INDEX.BOOKING)} />
      <form className={styles.form}>
        <FormInput
          type="text"
          id="bookingForm-fName"
          label="First Name"
          placeholder={"e.g. " + placeHolder.fName}
          defaultValue={data.fName}
          validator={validationSchema.fName}
          useRef={fNameRef}
        />
        <FormInput
          type="text"
          id="bookingForm-lName"
          label="Last Name"
          placeholder={"e.g. " + placeHolder.lName}
          defaultValue={data.lName}
          validator={validationSchema.lName}
          useRef={lNameRef}
        />
        <FormInput
          type="tel"
          id="bookingForm-phone"
          label="Phone Number"
          placeholder={"e.g. " + placeHolder.phone}
          defaultValue={data.phone}
          validator={validationSchema.phone}
          useRef={phoneRef}
        />
        <FormInput
          type="email"
          id="bookingForm-email"
          label="Email Address"
          placeholder={"e.g. " + placeHolder.email}
          defaultValue={data.email}
          validator={validationSchema.email}
          useRef={emailRef}
        />
        <Button primary wide onClick={onClick}>Next</Button>
      </form>
    </>
  );
};

export default PersonalForm;