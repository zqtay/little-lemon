import styles from "./Booking.module.scss";
import Button from "../UI/Button/Button";
import Container from "../UI/Container/Container";
import FormInput from "../UI/FormInput/FormInput";
import NumberPicker from "../UI/NumberPicker/NumberPicker";
import Spinner from "../UI/Spinner/Spinner";
import { simulateFetch } from "../../Util";

import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

/* Index for pages */
const PAGE_BOOKING = 0;
const PAGE_PERSONAL = 1;
const PAGE_CONFIRM = 2;

/* State for form submission */
const STATE_READY = 0;
const STATE_PENDING = 1;
const STATE_SUCCESS = 2;
const STATE_FAILED = 3;

const HEADER_TITLE = "Reserve a Table";

const placeHolder = {
  fName: "John",
  lName: "Doe",
  phone: "+12345678901",
  email: "john-doe@email.com"
};

/* Validation schema */
const schema = {
  date: Yup.date()
    .required("Required")
    .transform(
      (value, originalValue) => {
        return (originalValue === "") ? undefined : new Date(originalValue);
      }
    )
    .min(Date.now() - 86400000, "Date cannot be in the past"),
  time: Yup.string()
    .required("Required")
    .test(
      "openingHours",
      "Time should be within 10am to 8pm",
      value => {
        const minute = parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1]);
        return minute >= (10 * 60) && minute < (20 * 60);
      }
    ),
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  phone: Yup.string().required("Required"),
  email: Yup.string().required("Required").email("Invalid email address")
};

const Booking = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(PAGE_BOOKING);
  const navigate = useNavigate();

  const onClickHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.booking}>
      <Container className={styles.container}>
        {page === PAGE_BOOKING && <BookingDetails data={data} setData={setData} setPage={setPage} onClickHome={onClickHome}></BookingDetails>}
        {page === PAGE_PERSONAL && <PersonalDetails data={data} setData={setData} setPage={setPage}></PersonalDetails>}
        {page === PAGE_CONFIRM && <ConfirmPage data={data} setPage={setPage} onClickHome={onClickHome}></ConfirmPage>}
      </Container>
    </div>
  );
};

const BookingDetails = ({ data, setData, setPage, onClickHome }) => {
  const dateRef = useRef();
  const timeRef = useRef();
  const groupSizeRef = useRef();

  const onClick = (e) => {
    // Check inputs
    let isValid = dateRef.current.validate();
    isValid &= timeRef.current.validate();
    if (isValid) {
      const newData = data === null ? {} : { ...data };
      newData.date = dateRef.current.value;
      newData.time = timeRef.current.value;
      newData.groupSize = parseInt(groupSizeRef.current.innerText);
      setData(newData);
      setPage(PAGE_PERSONAL);
    }
  };

  return (
    <>
      <PageHeader subTitle="Booking Details" goBack={onClickHome} />
      <form className={styles.form}>
        <FormInput
          type="date"
          label="Date"
          defaultValue={data?.date}
          validator={schema.date}
          useRef={dateRef}
        />
        <FormInput
          type="time"
          label="Time"
          defaultValue={data?.time}
          validator={schema.time}
          useRef={timeRef}
        />
        <div className={styles["group-size"]}>
          <label>Group Size</label>
          <NumberPicker min={1} max={8} value={data?.groupSize} useRef={groupSizeRef} />
        </div>
        <Button primary wide onClick={onClick}>Next</Button>
      </form>
    </>
  );
};

const PersonalDetails = ({ data, setData, setPage }) => {
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
      setPage(PAGE_CONFIRM);
    }
  };

  return (
    <>
      <PageHeader subTitle="Personal Details" goBack={() => setPage(PAGE_BOOKING)} />
      <form className={styles.form}>
        <FormInput
          type="text"
          label="First Name"
          placeholder={"e.g. " + placeHolder.fName}
          defaultValue={data.fName}
          validator={schema.fName}
          useRef={fNameRef}
        />
        <FormInput
          type="text"
          label="Last Name"
          placeholder={"e.g. " + placeHolder.lName}
          defaultValue={data.lName}
          validator={schema.lName}
          useRef={lNameRef}
        />
        <FormInput
          type="tel"
          label="Phone Number"
          placeholder={"e.g. " + placeHolder.phone}
          defaultValue={data.phone}
          validator={schema.phone}
          useRef={phoneRef}
        />
        <FormInput
          type="email"
          label="Email Address"
          placeholder={"e.g. " + placeHolder.email}
          defaultValue={data.email}
          validator={schema.email}
          useRef={emailRef}
        />
        <Button primary wide onClick={onClick}>Next</Button>
      </form>
    </>
  );
};

const ConfirmPage = ({ data, setPage, onClickHome }) => {
  const [state, setState] = useState(STATE_READY);

  const onClickSubmit = (e) => {
    setState(STATE_PENDING);
    simulateFetch(0.5).then(res => {
      if (res.status === 200) {
        setState(STATE_SUCCESS);
      }
      else {
        setState(STATE_FAILED);
      }
    });
  };

  const onClickGoBack = (e) => {
    if (state === STATE_READY || state === STATE_FAILED) {
      // Do not allow going back if submission is success or pending
      setPage(PAGE_PERSONAL);
    }
  };

  return (
    <>
      <PageHeader subTitle="Confirmation" goBack={onClickGoBack} />
      <div className={styles.confirm}>
        <BookingSummary data={data} />
        <BookingConfirmStatus state={state} />
        {(state !== STATE_SUCCESS)
          ? <Button primary wide disabled={state === STATE_PENDING} onClick={onClickSubmit}>Submit</Button>
          : <Button primary wide onClick={onClickHome}>Home</Button>
        }
      </div>
    </>
  );
};

const PageHeader = ({ subTitle, goBack }) => {
  return (
    <div className={styles.header}>
      <h2>{HEADER_TITLE}</h2>
      <div>
        <div className={styles["back-button"]} onClick={goBack}>{`<`}</div>
        <h3>{subTitle}</h3>
      </div>
    </div>
  );
};

const BookingSummary = ({ data }) => {
  return (
    <table className={styles["summary-table"]}>
      <tbody>
        <BookingSummaryRow name="Date & Time" value={`${data.date} ${data.time}`} />
        <BookingSummaryRow name="Group Size" value={data.groupSize} />
        <tr className={styles.spacer}></tr>
        <BookingSummaryRow name="Name" value={`${data.fName} ${data.lName}`} />
        <BookingSummaryRow name="Phone Number" value={data.phone} />
        <BookingSummaryRow name="Email Address" value={data.email} />
      </tbody>
    </table>
  );
};

const BookingSummaryRow = ({ name, value }) => {
  return (
    <tr>
      <td>{`${name}`}</td>
      <td>{value}</td>
    </tr>
  );
};

const BookingConfirmStatus = ({ state }) => {
  return (
    <div className={styles["confirm-status"]}>
      {(state === STATE_READY) && `Click below to submit your reservation.`}
      {(state === STATE_PENDING) && <Spinner />}
      {(state === STATE_SUCCESS) && `Your reservation is confirmed. Click below to go back to homepage.`}
      {(state === STATE_FAILED) && `Something went wrong. Please try again.`}
    </div>
  );
};

export default Booking;