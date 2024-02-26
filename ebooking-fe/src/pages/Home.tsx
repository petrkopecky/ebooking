import { Link } from "react-router-dom";
import { UserContext, UserContextType, useUserContext } from "../UserContext";

const Home = () => {
  const userContext = useUserContext();
  return (
    <div>
      <p>Home</p>
      <p>{userContext?.bookingUser?.userName}</p>
      <p>{userContext?.bookingUser?.userRole}</p>
      <p>
        <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Home;
