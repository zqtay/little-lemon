import styles from "../Booking.module.scss";
import inputStyles from "../../UI/FormInput/FormInput.module.scss";
import Button from "../../UI/Button/Button";
import FormInput from "../../UI/FormInput/FormInput";
import NumberPicker from "../../UI/NumberPicker/NumberPicker";
import BookingHeader from "../BookingHeader/BookingHeader";
import { PAGE_INDEX, validationSchema } from "../Booking";

import { fetchAPI } from "../../../api/api";
import { useEffect, useReducer, useRef } from "react";

/* Group size limits */
const GROUPSIZE_LIMIT = {
  MIN: 1,
  MAX: 8
};

const BookingForm = ({ data, setData, setPage, onClickHome }) => {
  const dateRef = useRef();
  const timeRef = useRef();
  const groupSizeRef = useRef();

  // Set default time options for today
  const initializeTimes = () => {
    return fetchAPI(new Date());
  };
  // Reducer to update time options
  const updateTimes = (state, event) => {
    if (event.target.value !== "") {
      return fetchAPI(new Date(event.target.value));
    }
    else {
      return [];
    }
  };
  const [availableTimes, setAvailableTimes] = useReducer(updateTimes, null, initializeTimes);

  // Handle click to validate inputs and update data
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
      setPage(PAGE_INDEX.PERSONAL);
    }
  };

  useEffect(() => {
    // Set default selected date to today
    if (data === null || data.date === undefined) {
      // Get local datetime with ISO format
      const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
      const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().split("T")[0];
      dateRef.current.value = localISOTime;
    }
  }, [data]);

  return (
    <>
      <BookingHeader subTitle="Booking Details" goBack={onClickHome} />
      <form className={styles.form}>
        <FormInput
          type="date"
          id="bookingForm-date"
          label="Date"
          defaultValue={data?.date}
          validator={validationSchema.date}
          onChange={setAvailableTimes}
          useRef={dateRef}
        />
        <FormInput
          type="select"
          id="bookingForm-time"
          label="Time"
          options={availableTimes}
          defaultValue={data?.time}
          validator={validationSchema.time}
          useRef={timeRef}
        />
        <div className={inputStyles["input-field"]}>
          <label>Group Size</label>
          <NumberPicker min={GROUPSIZE_LIMIT.MIN} max={GROUPSIZE_LIMIT.MAX} value={data?.groupSize} useRef={groupSizeRef} />
        </div>
        <Button primary wide onClick={onClick}>Next</Button>
      </form>
    </>
  );
};

export default BookingForm;