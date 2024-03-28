import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const userContext = useUserContext();
  const [spin, setSpin] = useState<boolean>(false);
  const [spin1, setSpin1] = useState<boolean>(false);
  useEffect(() => {
    console.log("useEffect");
  }, []);

  useEffect(() => {
    console.log("useEffect spin s");
    //longr();
    delay(5000);
    console.log("useEffect spin e");
  }, [spin]);
  function getx(i: number): string {
    console.log("getx" + i);
    return "x";
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  function longr() {
    let n: number = 0;
    while (n < 3000000000) {
      n = n + 1;
      let x = n ^ (n + 1 / n);
    }
  }

  return (
    <div>
      <p>My bookings</p>
      {spin && <p> spin {getx(0)}</p>}
      {spin1 && <p> spin1 {getx(1)}</p>}

      <p>{userContext?.bookingUser?.userName}</p>
      <p>{userContext?.bookingUser?.userRole}</p>
      <p>
        <Link to="/home">Home</Link>
      </p>
      <button
        onClick={() => {
          setSpin(true);
          setSpin1(true);
        }}
      >
        set spin
      </button>
    </div>
  );
};

export default MyBookings;
