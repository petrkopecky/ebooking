import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";

const Home = () => {
  const userContext = useUserContext();
  return (
    <div>
      <p>Home</p>
      <p>{userContext?.bookingUser?.userName}</p>
      <p>{userContext?.bookingUser?.userRole}</p>
      <p>{userContext?.bookingUser?.authtoken}</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
      <p>
        <Link to="/my-bookings">My bookings</Link>
      </p>
    </div>
  );
};

export default Home;
