import styles from "./Booking.module.scss";
import Button from "../UI/Button/Button";
import Container from "../UI/Container/Container";
import NumberPicker from "../UI/NumberPicker/NumberPicker";
import FormInput from "../UI/FormInput/FormInput";
import { useRef, useState } from "react";
import { ROOT_URL } from "../../Util";

const PAGE_BOOKING = 0;
const PAGE_PERSONAL = 1;
const PAGE_CONFIRM = 2;

const placeHolder = {
  fName: "John",
  lName: "Doe",
  phone: "+12345678901",
  email: "john-doe@email.com"
};

const Booking = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(PAGE_BOOKING);
  return (
    <div className={styles.booking}>
      <Container>
        {page === PAGE_BOOKING && <BookingDetails data={data} setData={setData} setPage={setPage}></BookingDetails>}
        {page === PAGE_PERSONAL && <PersonalDetails data={data} setData={setData} setPage={setPage}></PersonalDetails>}
        {page === PAGE_CONFIRM && <ConfirmPage data={data} setPage={setPage}></ConfirmPage>}
      </Container>
    </div>
  );
};

const BookingDetails = ({ data, setData, setPage }) => {
  const dateRef = useRef();
  const timeRef = useRef();
  const groupSizeRef = useRef();

  const onClick = (e) => {
    const newData = data === null ? {} : { ...data };
    newData.date = dateRef.current.value;
    newData.time = timeRef.current.value;
    newData.groupSize = parseInt(groupSizeRef.current.innerText);
    setData(newData);
    setPage(PAGE_PERSONAL);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Booking Details</h2>
        <BackButton onClick={(e) => {
          e.preventDefault();
          window.location.href = ROOT_URL;
        }} />
      </div>
      <form className={styles.form}>
        <FormInput type="date" label="Date" value={data?.date} useRef={dateRef} />
        <FormInput type="time" label="Time" value={data?.time} useRef={timeRef} />
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
    const newData = data === null ? {} : { ...data };
    newData.fName = fNameRef.current.value;
    newData.lName = lNameRef.current.value;
    newData.phone = phoneRef.current.value;
    newData.email = emailRef.current.value;
    setData(newData);
    setPage(PAGE_CONFIRM);
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Personal Details</h2>
        <BackButton onClick={() => setPage(PAGE_BOOKING)} />
      </div>
      <form className={styles.form}>
        <FormInput type="text" label="First Name" placeholder={"e.g. " + placeHolder.fName} value={data.fName} useRef={fNameRef} />
        <FormInput type="text" label="Last Name" placeholder={"e.g. " + placeHolder.lName} value={data.lName} useRef={lNameRef} />
        <FormInput type="tel" label="Phone Number" placeholder={"e.g. " + placeHolder.phone} value={data.phone} useRef={phoneRef} />
        <FormInput type="email" label="Email Address" placeholder={"e.g. " + placeHolder.email} value={data.email} useRef={emailRef} />
        <Button primary wide onClick={onClick}>Next</Button>
      </form>
    </>
  );
};

const ConfirmPage = ({ data, setPage }) => {
  const [status, setStatus] = useState();

  const onClick = (e) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };
    fetch('https://reqres.in/api/posts', requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Confirmation</h2>
        <BackButton onClick={() => setPage(PAGE_PERSONAL)} />
      </div>
      <div>{status}</div>
      <Button primary wide onClick={onClick}>Submit</Button>
    </>
  );
};

const BackButton = ({ onClick }) => {
  return (
    <div className={styles["back-button"]} onClick={onClick}>{`< Back`}</div>
  );
};

export default Booking;