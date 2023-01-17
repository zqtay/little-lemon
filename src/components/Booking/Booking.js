import styles from "./Booking.module.scss";
import Container from "../UI/Container/Container";
import BookingForm from "./BookingForm/BookingForm";
import PersonalForm from "./PersonalForm/PersonalForm";
import ConfirmPage from "./ConfirmPage/ConfirmPage";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

/* Index for pages */
export const PAGE_INDEX = {
  BOOKING: 0,
  PERSONAL: 1,
  CONFIRM: 2,
}

/* Validation schema */
export const validationSchema = {
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
      "Time should be between 17:00 to 23:30",
      value => {
        const minute = parseInt(value.split(":")[0]) * 60 + parseInt(value.split(":")[1]);
        return minute >= (17 * 60) && minute <= (23.5 * 60);
      }
    ),
  fName: Yup.string().required("Required"),
  lName: Yup.string().required("Required"),
  phone: Yup.string().required("Required").test(
    "phoneNumberFormat",
    "Invalid phone number",
    value => {
      // Must start with + and include numbers, dashes, and spaces only
      return (value.length > 1) && value.startsWith("+") && (value.match(/[^0-9|+|\-|\s]/) == null);
    }
  ),
  email: Yup.string().required("Required").email("Invalid email address")
};

const Booking = () => {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(PAGE_INDEX.BOOKING);
  const navigate = useNavigate();

  const onClickHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className={styles.booking}>
      <Container className={styles.container}>
        {page === PAGE_INDEX.BOOKING && <BookingForm data={data} setData={setData} setPage={setPage} onClickHome={onClickHome}></BookingForm>}
        {page === PAGE_INDEX.PERSONAL && <PersonalForm data={data} setData={setData} setPage={setPage}></PersonalForm>}
        {page === PAGE_INDEX.CONFIRM && <ConfirmPage data={data} setPage={setPage} onClickHome={onClickHome}></ConfirmPage>}
      </Container>
    </div>
  );
};

export default Booking;