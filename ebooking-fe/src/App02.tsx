import { useEffect, useState } from "react";
import DatePicker from "./components/DatePicker/DatePicker.tsx";
import "./App.css";

function App() {
  const initialDate = new Date();
  const [spin, setSpin] = useState<boolean>(false);
  const [ready, setReady] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<Date>(new Date(initialDate));

  useEffect(() => {
    console.log("use effect");
  }, []);

  useEffect(() => {
    console.log("use effect bookingDate:" + bookingDate.toDateString());
    setDate(bookingDate);
  }, [bookingDate]);
  function setDate(date: Date) {
    setError(false);
    setReady(false);
    setSpin(true);
  }

  function onDateChange(date: Date) {
    console.log(
      "onDateChange" + bookingDate.toDateString() + "  " + date.toDateString()
    );
    setBookingDate(date);
  }

  if (error) {
    return <div>{errorMessage}</div>;
  } else {
    return (
      <>
        {error && <div>{errorMessage}</div>}
        <div className="app">
          <span>ebooking</span>
          {spin && <p>Loading</p>}

          <div>
            initial {initialDate.toDateString()}
            <DatePicker
              onDateChange={(date) => {
                onDateChange(date);
              }}
              initialDate={initialDate}
            ></DatePicker>
          </div>
        </div>
      </>
    );
  }
}

export default App;
