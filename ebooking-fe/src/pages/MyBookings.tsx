import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";

const MyBookings = () => {
  const userContext = useUserContext();
  return (
    <div>
      <p>My bookings</p>
      <p>{userContext?.bookingUser?.userName}</p>
      <p>{userContext?.bookingUser?.userRole}</p>
      <p>
        <Link to="/home">Home</Link>
      </p>
    </div>
  );
};

export default MyBookings;
